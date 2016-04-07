/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    post_update: function(req, res) {
        var msg = req.param('msg');
        console.debug(msg)
        console.debug(req.user)
        if (!msg || !msg.title || !req.user || !req.user.id) {
            return res.badRequest();
        }

        return Q()
            .then(function() {
                return User.findOne({id: req.user.id});
            })
            .then(function(user) {
                if (!user) {
                    throw new Error('authorize first!');
                }
                msg.editor = user.id;
                return Post.findOrCreate({id: msg.id}, {
                    author : user.id,
                    title  : msg.title,
                })
            })
            .then(function(post) {
                if (!msg.language && !msg.blog && !msg.post) {
                    return post;
                }
                return Q.all([
                        Language.findOne({id: msg.language}),
                        Blog.findOne({id: msg.blog}),
                        msg.post ? Post.findOne({id: msg.post}) : undefined,
                    ])
                    .spread(function(language, blog, parent) {
                        post.language = language.id;
                        post.blog = blog.id;
                        if (parent) {
                            post.parent = parent.id;
                        }
                        return post.save();
                    })
            })
            .then(function(post) {
                return post.update({
                    tags   : msg.tags,
                    text   : msg.text,
                    title  : msg.title,
                });
            })
            .then(function(post) {
                res.send({id: post.id});
                return res.ok();
            })
            .catch(function(err) {
                console.error('post_POST err', err)
                return res.serverError(err);
            })
    },

    post_remove: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.badRequest();
        }
        else {
            return Post
                .destroyWithChildren({id: id})
                .then(function() {
                    console.info('postsa are destroyed')
                })
                .then(res.ok)
                .catch(res.serverError)
        }
    },





    portfolio_create: function(req, res) {
        var msg = req.param('msg');
        console.debug(msg)
        return Portfolio
            .findOne({name: msg.name})
            .then(function(portfolio) {
                if (portfolio) {
                    throw new Error('Portfolio with name "'+msg.name+'" already exists!');
                }
                return Portfolio.create({
                    name: msg.name,
                })
            })
            .then(function(portfolio) {
                res.send({id: portfolio.id, name: portfolio.name});
                return res.ok();
            })
            .catch(res.serverError)
    },

    portfolio_update: function(req, res) {
        var msg = req.param('msg');
        return Portfolio
            .findOne({id: msg.id})
            .then(function(portfolio) {
                if (!portfolio) {
                    throw new Error(404);
                }
                portfolio.description = msg.description;
                portfolio.assets      = msg.assets;
                return portfolio.save();
            })
            .then(function(portfolio) {
                res.send({id: portfolio.id, name: portfolio.name});
                return res.ok();
            })
            .catch(res.serverError)
    },

    portfolio_remove: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.badRequest();
        }
        else {
            return Portfolio
                .findOne({id: id})
                .then(function(portfolio) {
                    portfolio.destroy();
                    console.info('portfolio_remove', portfolio.toJSON());
                })
                .then(res.ok)
                .catch(res.serverError)
        }
    },





    qa_create: function(req, res) {
        var name = req.param('name');
        var email = req.param('email');
        var text = req.param('text');

        return Q()
            .then(function() {
                if (!name || !email || !text) {
                    throw new Error('Please complete all fields correctly!');
                }
            })
            .then(function() {
                return QA.create({
                    author: name,
                    email: email,
                    text: text,
                });
            })
            .then(function() {
                flashes.info(req, 'Your message has been sent');
                return res.redirect('/qa');
            })
            .catch(function(err) {
                flashes.error(req, err);
                return res.redirect(req.get('referer'));
            })
    },

    qa_remove: function(req, res) {
        var id = parseInt(req.param('id'));

        QA.findOne({
            id: id,
        })
        .then(function(found) {
            if (!found) {
                return res.notFound();
            }
            console.debug('qa_remove', found.toJSON());
            found.destroy();
            return res.ok();
        })
        .catch(res.serverError)
    },





    pay_request_create: function(req, res) {
        var msg = req.param('msg');
        if (!msg) {
            return res.badRequest();
        }

        Request.create({
            type         : 'pay_request',
            author_name  : msg.name,
            author_email : msg.email,
            author_phone : msg.phone,
            data         : msg.rate,
        })
        .then(function(created) {
            return res.ok();
        })
        .catch(res.serverError)
    },

    pay_request_remove: function(req, res) {
        var id = parseInt(req.param('id'));

        Request.findOne({
            id: id,
        })
        .then(function(found) {
            if (!found) {
                return res.notFound();
            }
            console.debug('pay_request_remove', found.toJSON());
            found.destroy();
            return res.ok();
        })
        .catch(res.serverError)
    },





    subscribe: function(req, res) {
        var credentials = req.param('email');
        console.info('subscription:', credentials);
        return res.redirect('/landing');
    }

};

