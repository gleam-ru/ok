module.exports = function(resolve) {
    System.importAll({
        _raw: [
            '/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
            '/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
        ]
    })
    .then(function() {
        return {
            template: '<input value="raw" placeholder="Type some tags">',
            props: ['tags'],
            watch: {
                tags: function() {
                    this.sync();
                },
            },
            methods: {
                add: function(tag) {
                    this.tags.push(tag);
                    this.$input.tagsinput('add', tag);
                },
                remove: function(tag) {
                    var idx = this.tags.indexOf(tag);
                    var removed;
                    if (idx !== -1) {
                        removed = this.tags.splice(idx, 1);
                        this.$input.tagsinput('remove', tag);
                    }
                    return removed;
                },
                sync: function(tags) {
                    var vm = this;
                    vm.$input.tagsinput('removeAll');
                    _.each(vm.tags, function(tag) {
                        vm.$input.tagsinput('add', tag);
                    });
                },
            },
            computed: {
                raw: function() {
                    return this.tags.join();
                }
            },
            ready: function() {
                var vm = this;
                window.ti = this;

                vm.$input = $(vm.$el);
                vm.$input.val(vm.tags ? vm.tags.join(',') : '')
                vm.$input.tagsinput({
                    confirmKeys: [13, 44],
                    trimValue: true,
                })
                vm.$input.on('itemAdded', function(event) {
                    var item = event.item;
                    if (vm.tags.indexOf(item) === -1) {
                        console.log('itemAdded');
                        vm.tags.push(item);
                    }
                });
                vm.$input.on('itemRemoved', function(event) {
                    console.log('itemRemoved');
                    var item = event.item;
                    vm.remove(item);
                });
            }
        }
    })
    .then(resolve)
    ;
}
