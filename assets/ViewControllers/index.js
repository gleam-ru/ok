$(document).ready(function() {
    new Vue({
        el: '#vue',
        template: Jade.Vue.usersTable(),
        components: {
        },
        data: {
            users: _.map(globalVars.users, function(user) {
                user.roles = _.map(user.roles, 'id');
                return user;
            }),
            roles: globalVars.roles,
        },
        methods: {
            save: function() {
                console.log(this.users[0].roles)
            },
        },
        ready: function() {
            var vm = this;
            $(this.$el.getElementsByTagName('select'))
                .chosen()
                .change(function(e, item) {
                    var selected   = parseInt(item.selected);
                    var deselected = parseInt(item.deselected);
                    var user_id    = $(e.target).data('uid');
                    var user       = _.find(vm.users, {id: user_id});

                    if (selected) {
                        user.roles.push(selected);
                    }
                    else if (deselected) {
                        _.remove(user.roles, function(role_id) {
                            return role_id == deselected
                        })
                    }
                    else {
                        console.warn('dafaq?!');
                    }
                })
        },
    })
});
