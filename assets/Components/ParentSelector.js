module.exports = function(resolve) {
    System.importAll({
        _raw: [
            '/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css',
            '/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js',
        ]
    })
    .then(function() {
        return {
            template: [
                '<div class="vi-parentSelector">',
                    '<a><div class="btn button social-icon vi-iconButton"><i @click=toggleSelector class="fa fa-folder"></i></div></a>',
                    '<span>{{text}}</span>',
                    '<div v-el:popup v-show=mpIsVisible class="white-popup" style="max-width: 60vw; height: 80vh;">',
                        '<h4>Select parent</h4>',
                        '<input v-model="filter">',
                        '<div v-el:tree class="fn-treeview"></div>',
                    '</div>',
                '</div>',
            ].join(''),
            props: ['tree', 'blog', 'post'],
            data: function() {
                return {
                    filter: '',
                    text: '',
                    mpIsVisible: false,
                    nodeId: '',
                };
            },
            watch: {
                filter: function() {
                    var vm = this;
                    console.log(vm.filter);
                    var pattern = vm.filter;
                    var tree = vm.$tree.treeview(true);
                    tree.enableAll();
                    if (pattern.length < 3) { // avoid heavy operation
                        tree.expandAll();
                        tree.clearSearch();
                    }
                    else {
                        tree.collapseAll();
                        tree.search(pattern);
                        // get all root nodes: node 0 who is assumed to be
                        // a root node, and all siblings of node 0.
                        var roots = tree.getSiblings(0);
                        roots.push(tree.getNode(0));
                        // first collect all nodes to disable, then call disable once.
                        // Calling disable on each of them directly is extremely slow!
                        var unrelated = collectUnrelated(roots);
                        tree.disableNode(unrelated, {silent: true});
                    }
                },
                blog: function() {
                    var vm = this;
                    vm.selectNode({
                        b_id : vm.blog,
                        id   : vm.post,
                    })
                },
                post: function() {
                    var vm = this;
                    vm.selectNode({
                        b_id : vm.blog,
                        id   : vm.post,
                    })
                },
            },
            methods: {
                formatNode: function(node) {
                    if (!node) return;
                    var vm = this;
                    var nodes = _.map(node.children, vm.formatNode);
                    var result = {
                        text  : node.name,
                        nodes : nodes.length ? nodes : undefined,
                        b_id  : node.b_id,
                    };
                    if (node.isBlog) {
                        // blog-node
                        result = _.extend(result, {
                            icon  : 'fa fa-sitemap',
                            color : '#000',
                        })
                    }
                    else {
                        // post-node
                        result = _.extend(result, {
                            id    : node.id,
                            icon  : result.nodes ? 'fa fa-files-o' : 'fa fa-file-o',
                        })
                    }
                    return result;
                },
                selectNode: function(_params) {
                    var vm = this;
                    var params = {};
                    if (_params.b_id) {
                        params.b_id = _params.b_id;
                    }
                    if (_params.id) {
                        params.id = _params.id;
                    }
                    var flat = vm._tree.getUnchecked();
                    var node = _.find(flat, params);
                    if (node) {
                        vm._tree.selectNode(node.nodeId)
                    }
                    else {
                        console.log('deselect');
                    }
                    if (vm.nodeId !== (node && node.nodeId)) {
                        vm.afterNodeSelected(node);
                    }
                },
                afterNodeSelected: function(node) {
                    console.log('ans')
                    var vm = this;
                    if (node) {
                        var tree = vm._tree;
                        var post = node.id;
                        var blog = node.b_id;
                        var text = node.text + ' /';
                        while (node.parentId !== undefined) {
                            node = tree.getNode(node.parentId);
                            text = node.text+' / '+text;
                            blog = node.b_id;
                        }
                        vm.nodeId = node.nodeId;
                        vm.post   = post;
                        vm.blog   = blog;
                        vm.text   = text;
                        console.log(vm.blog, vm.post, vm.text)
                    }
                    else {
                        vm.nodeId = undefined;
                        vm.post   = '';
                        vm.blog   = '';
                        vm.text   = '';
                    }
                },

                toggleSelector: function() {
                    var vm = this;
                    if (vm.mpIsVisible) {
                        $.magnificPopup.close();
                        return;
                    }
                    $.magnificPopup.open({
                        items: {
                            src: $(vm.$els.popup),
                            type: 'inline'
                        },
                        callbacks: {
                            open: function() {
                                vm.mpIsVisible = true;
                            },
                            close: function() {
                                vm.mpIsVisible = false;
                            },
                        },
                    });
                },
            },
            compiled: function() {
                var vm = this;
                vm.tree = vm.formatNode(vm.tree);
            },
            ready: function() {
                var vm = this;
                window.ps = vm;

                var $tree = $(vm.$els.tree);
                $tree.treeview({
                    data         : vm.tree ? vm.tree.nodes : [],
                    levels       : 99,
                    expandIcon   : 'fa fa-chevron-right',
                    collapseIcon : 'fa fa-chevron-down',
                    emptyIcon    : 'fa fa-transparent',
                    selectedBackColor : '#000',
                });

                vm._tree = $tree.treeview(true);
                vm.selectNode({b_id: vm.blog, id: vm.post});

                $(document).on('click', '.list-group-item.node-selected', function(e) {
                    var nodeid = $(this).data('nodeid');
                    var node = vm._tree.getNode(nodeid)
                    vm._tree.selectNode(node);
                    vm.afterNodeSelected(node);
                    vm.toggleSelector();
                })
            }
        }
    })
    .then(resolve)
    ;
}





// https://github.com/jonmiles/bootstrap-treeview/issues/101
/* find all nodes that are not related to search and should be disabled:
 * This excludes found nodes, their children and their parents.
 * Call this after collapsing all nodes and letting search() reveal.
 */
function collectUnrelated(nodes) {
    var unrelated = [];
    $.each(nodes, function (i, n) {
        if (!n.searchResult && !n.state.expanded) { // no hit, no parent
            unrelated.push(n.nodeId);
        }
        if (!n.searchResult && n.nodes) { // recurse for non-result children
            $.merge(unrelated, collectUnrelated(n.nodes));
        }
    });
    return unrelated;
}

