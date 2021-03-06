var me = {};

me.process = function(cb) {
    return Q.all([
        _role(),
        _admin(),
        _blog(),
        _portfolio(),
        _language(),
    ])
}

function _language() {
    console.log('filler:_language');
    var languages = [
        {id: 1, code: 'en', name: 'English'},
        {id: 2, code: 'ru', name: 'Русский'},
    ];
    return Q()
        .then(function() {
            return Language.findOrCreate(languages, languages)
        })
}

function _portfolio() {
    console.log('filler:_portfolio');
    var portfolios = [
        {name: 'cost'},
        {name: 'income'},
        {name: 'aggressive'},
        {name: 'conservative'},
    ];
    return Q()
        .then(function() {
            return Portfolio.findOrCreate(portfolios, portfolios)
        })
}

function _blog() {
    console.log('filler:_blog');
    var blogs = [
        {id: 1,   access: 1, name: 'index'},

        {id: 102, access: 3, img: 'archive.jpg', name: 'reviews'},
        {id: 103, access: 3, img: 'ideas.jpg',   name: 'recommendations'},
        {id: 104, access: 3, img: 'pie.jpg',     name: 'portfolios'},

        {id: 999, access: 1, name: 'archive'},
    ];
    return Q()
        .then(function() {
            return Blog.findOrCreate(blogs, blogs)
        })
}

function _role() {
    console.log('filler:_role');
    var roles = [
        {id: 1, name: 'ghost'},
        {id: 2, name: 'user'},
        {id: 3, name: 'paid'},
        {id: 4, name: 'admin'},
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
