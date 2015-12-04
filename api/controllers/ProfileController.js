/**
 * ProfileController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    get: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            if (req.user) {
                id = req.user.id;
            }
            else {
                return res.notFound();
            }
        }
        else {
            if (id === req.user && req.user.id) {
                return res.redirect('/profile');
            }
        }
        var data = {
            pageTitle: 'Profile',
            title: 'Profile',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Profile', href: '/profile'},
            ],

            profile: _.extend({}, req.user, {
                id: 1,
                name: 'No-Name',
                surname: 'No-Surname',
                email: 'No-Email',
                photo: 'team-member11.jpg',
            }),
        }
        return Q()
            .then(function() {
                return User
                    .findOne({id: id})
                    .populateAll()
                    .then(function(user) {
                        _.extend(data.profile, user);
                    })
            })
            .then(function() {
                return res.render('profile', data)
            })
    },


    edit: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            if (req.user) {
                id = req.user.id;
            }
            else {
                return res.notFound();
            }
        }
        var data = {
            pageTitle: 'Settings',
            title: 'Settings',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Profile', href: '/profile/get/'+id},
                {name: 'Settings', href: '/profile/settings'},
            ],

            profile: _.extend({}, req.user, {
                id: 1,
                name: 'No-Name',
                surname: 'No-Surname',
                email: 'No-Email',
                photo: 'team-member11.jpg',
            }),
        }
        return Q()
            .then(function() {
                return User
                    .findOne({id: id})
                    .populateAll()
                    .then(function(user) {
                        _.extend(data.profile, user);
                    })
            })
            .then(function() {
                return res.render('profile/edit', data)
            })
    },



    // POST
    update: function(req, res) {
        var id       = req.param('id');
        var name     = req.param('name');
        var surname  = req.param('surname');
        var email    = req.param('email');
        var old_pass = req.param('pass0');
        var new_pass = req.param('pass1');

        var referer = req.get('referer')

        Q()
            .then(function() {
                return User
                    .findOne({id: id})
                    .populateAll()
            })
            .then(function(user) {
                _.extend(user, {
                    name: name,
                    surname: surname,
                    email: email,
                })
                return user.save();
            })
            .then(function(user) {
                if (old_pass) {
                    return Passport
                        .findOne({user: user.id, strategy: 'local'})
                }
            })
            .then(function(passport) {
                if (old_pass) {
                    return new Promise(function(resolve, reject) {
                        passport.validatePassword(old_pass, function(err, ok) {
                            if (err) {
                                return reject(err);
                            }
                            if (ok) {
                                passport.password = new_pass;
                                passport.save()
                                return resolve()
                            }
                            else {
                                return reject(new Error('Current password is wrong'))
                            }
                        })
                    })

                }
            })
            .then(function() {
                flashes.push(req, 'info', 'Updated successfully');
                var referer = req.get('referer')
                return res.redirect(referer);
            })
            .catch(function(err) {
                flashes.push(req, 'form', req.body)
                console.error('user.update failed')
                console.error(err.stack);
                flashes.error(req, err);
                return res.redirect(referer);
            })
    },
};
