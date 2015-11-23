$(document).ready(function() {
    new Vue({
        el: '#vue',
        template: Jade.Vue.usersTable(),
        data: {
            users: _.map(globalVars.users, function(user) {
                user.roles = _.map(user.roles, 'id');
                return user;
            }),
            roles: globalVars.roles,
        },
    })
});
