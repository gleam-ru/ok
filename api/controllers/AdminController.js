/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        var data = {
            pageTitle: 'Admin',
        }
        return Q()
            .then(function() {
                return res.render('admin', data)
            })
    },


    user: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.notFound();
        }
        var data = {
            pageTitle: 'Edit user',
            title: 'Edit user',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Users', href: '/admin/users'},
                {name: 'Edit',  href: '/admin/users/edit/'+id},
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


    users: function(req, res) {
        var data = {
            pageTitle: 'All users',
            title: 'All users',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Users', href: '/admin/users'},
            ],
        }

        Q()
            .then(function() {
                return Role
                    .find()
                    .then(function(roles) {
                        _.remove(roles, {name: 'ghost'})
                        data.roles = roles;
                    })
            })
            .then(function() {
                return User
                    .find()
                    .populateAll()
                    .then(function(users) {
                        data.users = users;
                    })
            })
            .then(function() {
                return res.render('admin/users', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
    },



    create: function(req, res) {
        var data = {
            pageTitle: 'All users',
            title: 'All users',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Users', href: '/admin/users'},
            ],
        }

        Q()
            .then(function() {
                return res.render('admin/create', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
    },

    create_POST: function(req, res) {
        var cheerio = require('cheerio');
        var msg = req.param('msg');

        msg.snapshot = sanitize(msg.snapshot)
        var $ = cheerio.load(msg.snapshot)

        return Q()
            .then(function() {
                return Post.create({
                    name: msg.name || 'Noname',
                });
            })
            .then(function(post) {
                var $imgs = $('img');
                var tasks = [];
                $imgs.each(function(i, img) {
                    var $img = $(img);
                    var data = $img.attr('src')
                    tasks.push(
                        uploader
                            .uploadBase64Image(data, 'posts/'+post.id+'/')
                            .then(function(uploaded) {
                                if (!uploaded) {
                                    $img.remove();
                                }
                                else {
                                    $img.attr('src', uploaded);
                                }
                            })
                    );
                })
                return Q.all(tasks);
            })
            .then(function() {
                var text = $.html();
            })
            .catch(res.serverError)
    },

};
