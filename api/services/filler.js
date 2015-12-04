var me = {};

me.process = function(cb) {
    return Q.all([
        _role(),
        _admin(),
        _blog(),
    ])
}

function _blog() {
    console.log('filler:_blog');
    var blogs = [
        {name: 'analytics'},
        {name: 'reviews'},
        {name: 'recommendations'},
        {name: 'archive'},
    ];
    return Q()
        .then(function() {
            return Blog.findOrCreate(blogs, blogs)
        })
}

function _role() {
    console.log('filler:_role');
    var roles = [
        {name: 'admin'},
        {name: 'paid'},
        {name: 'user'},
        {name: 'ghost'},
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
                .findOrCreate({email: "admin@host.org"}, {
                    name: 'admin',
                    surname: 'adminov',
                    email: "admin@host.org",
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
