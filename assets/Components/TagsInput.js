module.exports = function(resolve) {
    System.importAll({
        _raw: [
            '/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
            '/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
        ]
    })
    .then(function() {
        return {
            template: '<input placeholder="Type some tags">',
            props: ['tags'],
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
                restore: function(tags) {
                    this.tags = tags;
                    this.$input.tagsinput('removeAll');
                    _.each(this.tags, this.add);
                },
                get: function() {
                    return this.tags;
                },
            },
            ready: function() {
                var vm = this;

                vm.$input = $(vm.$el);
                vm.$input.val(vm.tags ? vm.tags.join(',') : '')
                vm.$input.tagsinput({
                    confirmKeys: [9, 13, 44],
                    trimValue: true,
                })
                vm.$input.on('itemAdded', function(event) {
                    console.log('itemAdded');
                    var item = event.item;
                    vm.tags.push(item);
                });
                vm.$input.on('itemRemoved', function(event) {
                    console.log('itemRemoved');
                    var item = event.item;
                    _.remove(vm.tags, item);
                });
            }
        }
    })
    .then(resolve)
    ;
}
