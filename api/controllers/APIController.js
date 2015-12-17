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


    subscribe: function(req, res) {
        var credentials = req.param('email');
        console.info('subscription:', credentials);
        return res.redirect('/landing');
    }

};

