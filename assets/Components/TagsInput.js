window.TagsInput = function() {
    return Vue.extend({
        template: '<input v-model="input" placeholder="Type some tags">',
        props: ['raw'],
        data: function() {
            return {
                input: '',
                tags: [],
            }
        },
        methods: {
            add: function(tag) {
                this.tags.push(tag);
                this.$input.tagsinput('add', tag.name);
            },
            remove: function(tag) {
                _.remove(this.tags, tag);
                this.$input.tagsinput('remove', tag.name);
            },
            restore: function(tags) {
                this.tags = tags;
                this.$input.tagsinput('removeAll');
                _.each(this.tags, this.add);
            },
            get: function() {
                return this.tags;
            },

            notify: function() {
                this.$dispatch('tagsChanged', this.tags);
            },
        },
        ready: function() {
            var vm = this;

            _.each(vm.raw && vm.raw.split(','), function(tag) {
                vm.tags.push({name: tag});
            });
            vm.input = _.map(vm.tags, 'name').join(',')

            $.getScript('/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js', function() {
                loadFile('/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css')
                vm.$input = $(vm.$el);
                vm.$input.tagsinput({
                    confirmKeys: [9, 13, 44],
                    trimValue: true,
                })
                vm.$input.on('itemAdded', function(event) {
                    console.log('itemAdded');
                    var item = {name: event.item};
                    vm.tags.push(item);
                    vm.notify();
                });
                vm.$input.on('itemRemoved', function(event) {
                    console.log('itemRemoved');
                    var item = {name: event.item};
                    _.remove(vm.tags, item);
                    vm.notify();
                });
            })

            vm.notify();
        }
    })
}
