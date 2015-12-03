/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    index: function(req, res) {
        var data = {
            pageTitle: 'Blog',
            title: 'Blog',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Blog', href: '/blog'},
            ],
            posts: [],
        }
        return Q()
            .then(function() {
                return Post.find().populateAll();
            })
            .then(function(posts) {
                data.posts = _.map(posts, function(post) {
                    return post.getPreview();
                }).reverse()
            })
            .then(function() {
                return res.render('blog', data)
            })
            .catch(res.serverError)
    },

    get: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.notFound();
        }
        var data = {
            pageTitle: 'Post',
            title: 'Post',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Blog', href: '/blog'},
                {name: 'Post', href: '/blog/get/'+id},
            ]
        }
        return Q()
            .then(function() {
                return Post.findOne({id: id}).populateAll();
            })
            .then(function(post) {
                data.post = post.toJSON();
                data.title = data.post.title;
            })
            .then(function() {
                return res.render('blog/post', data)
            })
    },

    tag: function(req, res) {
        return res.notFound();
    },

};
