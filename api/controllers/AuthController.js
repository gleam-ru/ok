/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

var AuthController = {

    index: function (req, res) {
        // авторизирован? иди в профиль.
        if (req.isAuthenticated()) {
            return res.redirect('/profile');
        }

        var data = {
            pageTitle: 'Auth',
            title: 'Auth',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Auth', href: '/auth'},
            ],

            providers: _.map(sails.config.passport.strategies, function(strategy, provider) {
                return {
                    provider  : provider,
                    name      : strategy.name,
                    href      : strategy.callbackURL,
                    icon      : strategy.icon,
                }
            }),

            form: req.flash('form') || {},
        }
        return Q()
            .then(function() {
                return res.render('auth', data)
            })
    },

    //  ╔═╗╔═╗╔╦╗
    //  ║ ╦║╣  ║
    //  ╚═╝╚═╝ ╩

    logout: function (req, res) {
        passport.logout(req, res);
        return res.redirect('/auth');
    },

    //
    // login strategies
    //

    addStrategy: function(req, res) {
        var strategy = req.param('strategy');
        if (!sails.config.passport.strategies[strategy]) {
            console.warn('обращение к несуществующей стратегии:', strategy);
            return res.redirect('/auth');
        }
        passport.authenticate([strategy], function(err, user) {
            if (err || !user) {
                console.error(strategy+' auth error', err, user);
                return AuthController.tryAgain(req, res, err);
            }
            if (req.isAuthenticated()) {
                // осуществлялась привязка нового провайдера
                // к существующему пользователю
                return res.redirect(sails.config.passport.fillCredentials);
            }

            passport.login(req, res, user, function(err) {
                if (err) return AuthController.tryAgain(req, res, err);
                if (!user.username || !user.email || req._just_registered) {
                    // только что зарегистрирован или отсутствуют требуемые поля
                    req.flash('info', 'Пожалуйста, заполните информацию о себе.')
                    return res.redirect(sails.config.passport.fillCredentials);
                }
                return res.redirect(sails.config.passport.successRedirect);
            });
        })(req, res);
    },

    removeStrategy: function(req, res) {
        var strategy = req.param('strategy');
        var referer = req.get('referer');
        Passport.findOne({
            user: req.user.id,
            strategy: strategy,
        }, function(err, p) {
            if (err) return res.send(500);
            if (p) {
                return p.destroy(function(err) {
                    if (err) return res.send(500);
                    return res.redirect(referer || '/settings');
                });
            }
            return AuthController.registered(req, res);
        });
    },



    //  ╔═╗╔═╗╔═╗╔╦╗
    //  ╠═╝║ ║╚═╗ ║
    //  ╩  ╚═╝╚═╝ ╩

    action: function (req, res) {
        var action = req.param('action');

        // LOGIN
        if (!action || action == 'login') {
            req.flash('login', true);
            passport.authenticate(['local'], function (err, user, challenges) {
                if (err || !user) {
                    // ошибка или оправдание - показать пользователю
                    var errorText = err || challenges;
                    return AuthController.tryAgain(req, res, errorText);
                }
                // аутентификация успешна
                passport.login(req, res, user, function(err) {
                    if (err) return AuthController.tryAgain(req, res, err);
                    if (!user.email) {
                        // отсутствуют требуемые поля
                        req.flash('info', 'Please fill information about yourself')
                        return res.redirect(sails.config.passport.fillCredentials);
                    }
                    return res.redirect(sails.config.passport.successRedirect);
                });
            })(req, res);
        }

        // REGISTER
        else if (action == 'register') {
            req.flash('registering', true);
            var name     = req.param('name');
            var surname  = req.param('surname');
            var email    = req.param('email');
            var password = req.param('password');

            // minLength от Waterline всегда пропускает 0 символов... -_-
            if (!password) {
                return AuthController.tryAgain(req, res, new Error('Все поля обязательны для заполнения'));
            }

            var created = [];
            return Q.resolve()
                .then(function() {
                    return Q.all([
                        User.create({
                            name: name,
                            surname: surname,
                            email: email,
                        }),
                        Role.findOne({name: 'user'}),
                    ])
                })
                .then(function(results) {
                    var user = results[0];
                    var role = results[1];
                    user.roles.add(role.id);
                    return user.save();
                })
                .then(function(user) {
                    created.push(user);
                    return Passport.create({
                        user     : user.id,
                        strategy : 'local',
                        password : password,
                    })
                    .then(function(passport) {
                        created.push(passport);
                        return user;
                    })
                })
                .then(function(user) {
                    console.info('New local user! ID:', user.id, user.email);
                    // аутентифицируем пользователя
                    passport.login(req, res, user, function(err) {
                        if (err) {
                            return AuthController.tryAgain(req, res, err);
                        }
                        res.cookie('was_registered', true, { path: '/', httpOnly: true, maxAge: 604800000 })
                        return res.redirect('/');
                    });
                })
                .catch(function(err) {
                    console.error('Ошибка при регистрации. Откат');
                    console.error(err);
                    return Q.all(_.map(created, function(inst) {
                        return Q.resolve()
                            .then(function() {
                                console.log('destroy:', inst);
                                inst.destroy();
                            })
                    }))
                    .then(function() {
                        return AuthController.tryAgain(req, res, err);
                    })
                })
        }
        // WTF?!
        else {
            // dafuq s dat?!
            console.error('auth controller, unrecognized action:', action);
            return res.redirect('/');
        }
    },



    //  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝

    // возвращает на предыдущую страницу, но теперь с ошибками.
    // сохраняет заполненные данные
    tryAgain: function(req, res, err) {
        // сообщения об ошибке
        var errors = [];
        if (err) {
            if (Array.isArray(err)) {
                errors = _.flatten(_.map(err, parseError))
            }
            else {
                errors = parseError(err);
            }
            req.flash('error', errors);
        }

        // данные, чтобы форма восстановила свои данные
        req.flash('signup', req.body);
        // вьюшки должны уметь показывать error & form
        var referer = req.get('referer');
        res.redirect(referer || '/');
    },

};

module.exports = AuthController;


function parseError(err) {
    var errors = [];
    if (err.invalidAttributes) {
        /*
        err looks like: {
            code: 'E_VALIDATION',
            invalidAttributes: {
                email: [
                    [Object]
                ]
            },
            _e: {
                handle: 17,
                type: 'error',
                className: 'Error',
                constructorFunction: {
                    ref: 33
                },
                protoObject: {
                    ref: 34
                },
                prototypeObject: {
                    ref: 3
                },
                properties: [
                    [Object]
                ],
                text: 'Error'
            },
            rawStack: '    at WLValidationError.WLError (C:\\Users\\demeshenko\\AppData\\Roaming\\nvm\\v0.12.... (length: 1986)',
            reason: '1 attribute is invalid',
            status: 400,
            model: undefined,
            details: 'Invalid attributes sent to undefined:\n • email\n   • A record with that `email` a... (length: 113)',
            isOperational: true
        }
        //*/
        _.each(err.invalidAttributes, function(attr_review, attr_name) {
            var error = '<b>'+attr_name+'</b>: ';
            _.each(attr_review, function(item) {
                errors.push(error.slice()+item.message)
            })
        })
    }
    else if (err.message) {
        errors.push(err.message)
    }
    else {
        console.error('unhandled error');
        console.error(err.stack);
        errors.push('<b>Please, contact Administrator</b>');
    }
    return errors;
}
