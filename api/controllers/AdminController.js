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


    // страница с созданием поста
    create: function(req, res) {
        var data = {
            pageTitle: 'New',
            title: 'New',
            bc: [
                {name: 'Home',  href: '/'},
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

    post_POST: function(req, res) {
        var msg = req.param('msg');
        console.debug(1)

        if (!msg || !msg.title || !req.user || !req.user.id) {
            console.debug(2)
            return res.badRequest();
        }

        return Q()
            .then(function() {
                console.debug(3)
                return User.findOne({id: req.user.id});
            })
            .then(function(user) {
                if (!user) {
                    console.debug(4.0)
                    throw new Error('authorize first!');
                }
                console.debug(4.1)
                msg.editor = user.id;
                return Post.findOrCreate({id: msg.id}, {
                    author : user.id,
                    title  : msg.title,
                })
            })
            .then(function(post) {
                console.debug(5)
                return post.update({
                    tags   : msg.tags,
                    text   : msg.snapshot,
                    title  : msg.title,
                });
            })
            .then(function(post) {
                console.debug(6)
                res.send({id: post.id});
                return res.ok();
            })
            .catch(function(err) {
                console.debug(7)
                console.error('post_POST err', err)
                return res.serverError(err);
            })
    },


    // страница с редактированием поста
    edit: function(req, res) {
        var id = parseInt(req.param('id'))
        if (!id) {
            return res.notFound();
        }
        var data = {
            pageTitle: 'Edit',
            title: 'Edit',
            bc: [
                {name: 'Home',  href: '/'},
            ],
        }

        Q()
            .then(function() {
                return Post.findOne({id: id}).populateAll();
            })
            .then(function(post) {
                data.post = post.toJSON();
                data.post.tags = _.map(post.tags, 'name').join(',');
            })
            .then(function() {
                return res.render('admin/edit', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
    },
};
