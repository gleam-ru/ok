/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    default_list: function(req, res) {
        formatDataForList({
            types : 'no-category',
            tags  : req.param('tags'),
            page  : req.param('page'),
        })
        .then(function(data) {
            return _.extend(data, {
                pageTitle : 'Blog',
                title     : 'Blog',
            })
        })
        .then(function(data) {
            return res.render('blog/free/1-col', data)
        })
        .catch(res.serverError)
    },

    default_single: function(req, res) {
        formatDataForSingle({
            id: req.param('id'),
        })
        .then(function(data) {
            return res.render('blog/free/single', data)
        })
        .catch(res.serverError)
    },



    analytics_list: function(req, res) {
        formatDataForList({
            pageTitle: 'Analytics',
            title: 'Analytics',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
                {name: 'Analytics', href: '/paid/analytics'},
            ],
            types : 'analytics',
            tags  : req.param('tags'),
            page  : req.param('page'),
            base: '/paid/analytics',
        })
        .then(function(data) {
            return res.render('blog/paid/3-col', data)
        })
        .catch(res.serverError)
    },

    analytics_single: function(req, res) {
        formatDataForSingle({
            id: req.param('id'),
            base: '/paid/analytics',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
                {name: 'Analytics', href: '/paid/analytics'},
                {name: 'Post', href: '/paid/analytics/get/'+req.param('id')},
            ],
        })
        .then(function(data) {
            return res.render('blog/paid/single', data)
        })
        .catch(res.serverError)
    },



};


function formatDataForList(data) {
    return Q()
        .then(function() {
            _.extend({
                pageTitle: 'Blog',
                title: 'Blog',
                bc: [
                    {name: 'Home', href: '/'},
                    {name: 'Blog', href: '/blog'},
                ],
                posts: [],
                base: '/blog',
            }, data)
        })
        .then(function() {
            if (Array.isArray(data.tags) && data.tags.length) {
                data.subtitle = 'with tags: '+data.tags.join(', ');
            }
        })
        .then(function() {
            return feed.get({
                types : data.types,
                tags  : data.tags,
                page  : data.page || 1,
            });
        })
        .spread(function(posts, pagination) {
            data.posts = posts;
            data.pagination = pagination;
        })
        .then(function() {
            return data;
        })
}


function formatDataForSingle(data) {
    if (!data.id) {
        throw new Error('404');
    }
    return Q()
        .then(function() {
            _.extend({
                pageTitle: 'Post',
                title: 'Post',
                bc: [
                    {name: 'Home', href: '/'},
                    {name: 'Blog', href: '/blog'},
                    {name: 'Post', href: '/blog/get/'+data.id},
                ],
                pagination: {},
            }, data)
        })
        .then(function() {
            return Post.findOne({id: data.id}).populateAll();
        })
        .then(function(post) {
            data.post  = post.toJSON();
            data.title = data.post.title;
            data.pageTitle = data.post.title;
        })
        .then(function() {
            return data;
        })
}
