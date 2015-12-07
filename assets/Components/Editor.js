// TODO: сделать полноценной Vue страницей
window.initAlloy = function(config) {
    config = _.extend({
        storeAs        : 'post',
        savingInterval : 3000,
        // callbacks
        afterSave      : function() {},
        afterRestore   : function() {},
        onSmthChange   : function() {},
    }, config)
    return new Promise(function(ok, neok) {
        var me = {};
        me.config       = config;
        me.modified     = false;
        me.name         = $('#name');
        me.tags         = initTags();
        me.editor       = initEditor();
        me.meta         = initMeta();
        me.nativeEditor = me.editor.get('nativeEditor');

        me.save_ls = function() {
            var snapshot = me.nativeEditor.getData();
            var data = {
                snapshot : snapshot,
                title    : me.name.val(),
                tags     : me.tags.tagsinput('items'),
                meta     : me.meta.get(),
            };
            if (me.config.storeAs) {
                localStorage.setItem(me.config.storeAs, JSON.stringify(data));
            }
            me.modified = false;
            me.config.afterSave(data);
            return data;
        }

        me.restore_ls = function() {
            var data = JSON.parse(localStorage.getItem(me.config.storeAs) || '{}');
            me.name.val(data.title || '');
            _.each(data.tags, function(tag) {
                me.tags.tagsinput('add', tag);
            })
            me.nativeEditor.setData(data.snapshot);
            me.meta.set(data.meta);
            me.modified = false;
            // not working :(
            // nativeEditor.loadSnapshot(snapshot);
            me.config.afterRestore(data);
        }

        me.clear_ls = function() {
            localStorage.setItem(me.config.storeAs, '{}');
        }



        // events
        //
        me.nativeEditor.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        });
        me.tags.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        })
        me.name.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        })
        $(document).on('metaIsChanged', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        })



        // install
        //
        if (me.config.storeAs) {
            me.restore_ls();

            setInterval(function() {
                if (me.modified) {
                    me.save_ls();
                }
            }, me.config.savingInterval);
        }

        return ok(me);
    })
}


$('#save').on('click', function() {
    cnt.mask();
    var snapshot = nativeEditor.getData();
    var data = {
        id: $('#id').val(),
        snapshot: snapshot,
        title: $('#name').val(),
        tags: $tags.tagsinput('items'),
    };
    $.post('/edit', {
        msg: data,
    })
    .done(function(data) {
        window.location.href = '/blog/get/'+data.id;
    })
    .fail(function(err) {
        mp.alert('something went wrong...');
        console.error(err);
    })
    .always(function() {
        cnt.unmask();
    })
})



function initTags() {
    var $tags = $('#tags')
    $tags.tagsinput({
        confirmKeys: [9, 13, 44],
        trimValue: true,
    })

    return $tags;
}


function initEditor() {
    var tb;



    // link
    tb = AlloyEditor.Selections[0];



    // image
    tb = AlloyEditor.Selections[1];
    var filters = [{
        name: 'X-PRO 2',
        filter: 'contrast(1.3) brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-20deg)'
    }, {
        name: 'Willow',
        filter: 'saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02)'
    }, {
        name: 'Valencia',
        filter: 'sepia(0.15) saturate(1.5) contrast(0.9)'
    }, {
        name: 'Nashville',
        filter: 'sepia(0.4) saturate(1.5) contrast(0.9) brightness(1.1) hue-rotate(-15deg)'
    }, {
        name: 'Kelvin',
        filter: 'sepia(0.4) saturate(2.4) brightness(1.3) contrast(1)'
    }, {
        name: 'Inkwell',
        filter: 'grayscale(1) brightness(1.2) contrast(1.05)'
    }, {
        name: 'Earlybird',
        filter: 'sepia(0.4) saturate(1.6) contrast(1.1) brightness(0.9) hue-rotate(-10deg)'
    }, {
        name: 'Brannan',
        filter: 'sepia(0.5) contrast(1.4)'
    }, {
        name: '1977',
        filter: 'sepia(0.5) hue-rotate(-30deg) saturate(1.2) contrast(0.8)'
    }];

    var imageFilters = filters.map(function(filterDefinition) {
        return {
            name: filterDefinition.name,
            style: {
                element: 'img',
                styles: {
                    filter: filterDefinition.filter,
                    '-webkit-filter': filterDefinition.filter
                },
                type: CKEDITOR.STYLE_OBJECT
            }
        }
    });

    tb.buttons.unshift({
        name: 'styles',
        cfg: {
            styles: imageFilters
        }
    });



    // text
    tb = AlloyEditor.Selections[2];
    tb.buttons = [
        'h1',
        'h2',
        'bold',
        'italic',
        'underline',
        'strike',
        'ul',
        'link',
        'removeFormat',
    ];



    // table
    tb = AlloyEditor.Selections[3];
    var tableClasses = [{
        name: 'Normal Table',
        cssClass: 'table'
    }, {
        name: 'Striped Rows',
        cssClass: 'table table-striped'
    }, {
        name: 'Bordered Table',
        cssClass: 'table table-bordered'
    }, {
        name: 'Hover Rows',
        cssClass: 'table table-hover'
    }, {
        name: 'Condensed Table',
        cssClass: 'table table-condensed'
    }];

    var tableStyles = tableClasses.map(function(styleDefinition) {
        return {
            name: styleDefinition.name,
            style: {
                element: 'table',
                attributes: {
                    'class': styleDefinition.cssClass
                }
            }
        }
    });

    tb.buttons.unshift({
        name: 'styles',
        cfg: {
            styles: tableStyles
        }
    });



    return AlloyEditor.editable('zone', {
        toolbars: {
            add: {
                buttons: ['hline', 'image', 'table'],
                tabIndex: 2,
            },
            styles: {
                selections: AlloyEditor.Selections,
                tabIndex: 1,
            },
        },
    });
}

function initMeta() {
    window.vm = new Vue({
        debug: true,
        el: '#meta',
        data: {
            language  : 1,
            languages : [],
            blog      : 1,
            blogs     : [],
            post      : '',
            posts     : [],
        },

        ready: function() {
            var vm = this;
            vm.set({});
        },

        watch: {
            blog: function() {
                var vm = this;
                console.log(vm.blog);
                vm.getPosts();
                vm.onChange();
            },
            post: function() {
                vm.onChange();
            },
            language: function() {
                vm.onChange();
            },
        },

        methods: {
            get: function() {
                return {
                    language : this.language,
                    blog     : this.blog,
                    post     : this.post,
                }
            },

            set: function(data) {
                var vm = this;
                var cfg = _.extend({
                    language: 1,
                    blog: 1,
                    post: '',
                }, data);
                vm.getLanguages(function() {
                    vm.$data.language = cfg.language;
                    vm.getBlogs(function() {
                        vm.$data.blog = cfg.blog;
                        vm.getPosts(function() {
                            vm.$data.post = cfg.post;
                        });
                    });
                });
            },

            onChange: function() {
                $(document).trigger('metaIsChanged');
            },


            getLanguages: function(next) {
                var vm = this;
                var $el = $(vm.$el).find('#language');
                $el.disable();
                $.get('/api/language')
                .done(function (languages) {
                    vm.$data.languages = _.map(languages, function(l) {
                        return {
                            id: l.id,
                            name: l.code,
                        }
                    });
                    if (next) {
                        next();
                    }
                })
                .fail(function(err) {
                    console.error(err);
                    mp.alert('smth went wrong...')
                })
                .always(function() {
                    $el.enable();
                })
            },

            getBlogs: function(next) {
                var vm = this;
                var $el = $(vm.$el).find('#blog');
                $el.disable();
                $.get('/api/blog')
                .done(function (blogs) {
                    vm.$data.blogs = blogs;
                    if (next) {
                        next();
                    }
                })
                .fail(function(err) {
                    console.error(err);
                    mp.alert('smth went wrong...')
                })
                .always(function() {
                    $el.enable();
                })
            },

            getPosts: function(next) {
                var vm = this;
                vm.$data.post = '';
                var $el = $(vm.$el).find('#post');
                $el.disable();
                $.get('/api/post?where={"blog":'+(vm.blog||'null')+'}')
                .done(function (posts) {
                    vm.$data.posts = _.map([{}].concat(posts), function(p) {
                        return {
                            id: p.id,
                            name: p.title,
                        }
                    });
                    if (next) {
                        next();
                    }
                })
                .fail(function(err) {
                    console.error(err);
                    mp.alert('smth went wrong...')
                })
                .always(function() {
                    $el.enable();
                })
            },
        }

    })

    return window.vm;
}
