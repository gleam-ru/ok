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
            if (id === req.user.id) {
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
};
