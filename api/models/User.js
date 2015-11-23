var User = {
    attributes: {
        username  : { type: 'string', unique: true, minLength: 3 },
        email     : { type: 'email',  unique: true },
        access    : { type: 'string', defaultsTo: 'user' },
        roles     : { collection: 'Role', via: 'users' },

        passports : { collection: 'Passport', via: 'user' },

        createdAt : {type: 'date'},
    },

    beforeCreate: function (user, next) {
        user.createdAt = new Date();
        next(null, user);
    },
};

module.exports = User;
