var me = {};

me.process = function(cb) {
    return Q.all([
        _role(),
        _admin(),
    ])
}

function _role() {
    console.log('filler:_role');
    var roles = [
        {name: 'admin'},
        {name: 'user'},
        {name: 'paid'},
    ];
    return Q()
        .then(function() {
            return Role.findOrCreate(roles, roles)
        })
}


function _admin() {
    console.log('filler:_admin');
    return Q()
        .then(function() {
            return User
                .findOrCreate({username: 'admin'}, {
                    username: 'admin',
                    email: "admin@host.org",
                    access: "admin",
                })
        })
        .then(function(user) {
            return Passport
                .findOrCreate({user: user.id}, {
                    user: user.id,
                    strategy: 'local',
                    password: '1112233',
                })
                .then(function() {
                    return User.findOne({id: user.id}).populateAll();
                })
        })
        .then(function(user) {
            return Role
                .findOne({name: 'user'})
                .then(function(role) {
                    if (!_.find(user.roles, {name: role.name})) {
                        user.roles.add(role.id)
                        return user.save();
                    }
                    else {
                        return user;
                    }
                })
        })
        .then(function(user) {
            return Role
                .findOne({name: 'admin'})
                .then(function(role) {
                    if (!_.find(user.roles, {name: role.name})) {
                        user.roles.add(role.id)
                        return user.save();
                    }
                    else {
                        return user;
                    }
                })
        })
}


module.exports = me;
