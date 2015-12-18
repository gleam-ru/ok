/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */




// используется для получения
// "метаданных" (вспомогательных данных для работы PostEditor-а)
// таких как - список всех языков, блогов и "дерева" постов
//
function getMeta() {
    return Q.all([
        Language.find(),
        Blog.find(),
        Post.find(),
    ])
    .spread(function(languages, blogs, posts) {
        var tree = {id: 0, name: 'root', children: []};
        tree.children = _.map(blogs, function(b) {
            return {
                isBlog    : true,
                id        : undefined,
                b_id      : b.id,
                name      : b.name,
                children  : formatChildren(posts, _.filter(posts, function(p) {
                    return (p.blog === b.id && !p.parent);
                })),
            }
        });
        return {
            tree: tree,
            languages: _.map(languages, function(l) {
                return {
                    id: l.id,
                    name: l.code,
                }
            }),
        }
    })

    function formatChildren(all, children) {
        children = _.sortBy(children || [], 'createdAt');
        return _(children)
            .map(function(item) {
                return {
                    id       : item.id,
                    b_id     : item.blog,
                    name     : item.title,
                    children : formatChildren(all, _.filter(all, {parent: item.id})),
                }
            })
            .value()
            ;
    }
}


module.exports = {

    // страница с созданием поста
    create: function(req, res) {
        var data = {
            pageTitle: 'Create',
            title: 'Create',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Create post',  href: '/create'},
            ],
        }

        return Q()
            .then(getMeta)
            .then(function(meta) {
                _.extend(data, meta);
            })
            .then(function() {
                return res.render('blog/create', data);
            })
            .catch(function(err) {
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
                {name: 'Edit post',  href: '/edit'},
            ],
        }

        return Q()
            .then(getMeta)
            .then(function(meta) {
                _.extend(data, meta);
            })
            .then(function() {
                return Post.findOne({id: id}).populateAll();
            })
            .then(function(post) {
                data.post = post.toJSON();
            })
            .then(function() {
                return res.render('blog/edit', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
    },



    // /blog
    // показ дефолтных фидов (index, archive)
    //
    default_blog: function(req, res) {
        formatDataForList({
            types : [1, 999],
            tags  : req.param('tags'),
            page  : req.param('page'),
        })
        .then(function(data) {
            return _.extend(data, {
                pageTitle : 'Blog',
                title     : 'Blog',
                base      : '/blog',
                blog      : 1,
            })
        })
        .then(function(data) {
            return res.render('blog/free/1-col', data)
        })
        .catch(res.serverError)
    },

    // /blog/get/1
    default_post: function(req, res) {
        formatDataForSingle({
            id: req.param('id'),
            feedUrl: '/blog',
        })
        .then(function(data) {
            return res.render('blog/free/single', data)
        })
        .catch(res.serverError)
    },



    // /blog/f/name
    // показ бесплатного блога с именем name
    //
    // /blog/f
    free_feed: function(req, res) {
        return res.redirect('/blog');
    },

    // /blog/f/index
    free_blog: function(req, res) {
        var blog = req.param('blog');

        return Q()
            .then(function() {
                return Blog.findOne({name: blog});
            })
            .then(function(blog) {
                if (!blog) {
                    throw new Error(404);
                }
                return formatDataForList({
                    pageTitle : blog.name,
                    title     : blog.name,
                    bc: [
                        {name: 'Home',    href: '/'},
                        {name: 'Blog',    href: '/blog'},
                        {name: blog.name, href: '/blog/f/'+blog.name},
                    ],
                    types : [blog.id],
                    tags  : req.param('tags'),
                    page  : req.param('page'),
                    base  : '/blog/f/'+blog.name,
                    blog  : blog.id,
                })
            })
            .then(function(data) {
                return res.render('blog/free/1-col', data)
            })
            .catch(res.serverError)
    },

    // /blog/f/index/get/1
    free_post: function(req, res) {
        var blog = req.param('blog');

        return Q()
            .then(function() {
                return Blog.findOne({name: blog});
            })
            .then(function(blog) {
                if (!blog) {
                    throw new Error(404);
                }
                return formatDataForSingle({
                    id: req.param('id'),
                    bc: [
                        {name: 'Home',    href: '/'},
                        {name: 'Blog',    href: '/blog'},
                        {name: blog.name, href: '/blog/f/'+blog.name},
                        {name: 'Post',    href: '/blog/f/'+blog.name+'/get/'+req.param('id')},
                    ],
                    feedUrl: '/blog/f/'+blog.name,
                })
            })
            .then(function(data) {
                return res.render('blog/free/single', data)
            })
            .catch(res.serverError)
    },



    // /paid/f/name
    // показ платного блога с именем name
    //
    // /paid/f
    paid_feed: function(req, res) {
        return res.redirect('/paid');
    },

    // /paid/f/analytics
    paid_blog: function(req, res) {
        var blog = req.param('blog');

        return Q()
            .then(function() {
                return Blog.findOne({name: blog});
            })
            .then(function(blog) {
                if (!blog) {
                    throw new Error(404);
                }
                return formatDataForList({
                    pageTitle : blog.name,
                    title     : blog.name,
                    bc: [
                        {name: 'Home',    href: '/'},
                        {name: 'Paid',    href: '/paid'},
                        {name: blog.name, href: '/paid/f/'+blog.name},
                    ],
                    types : [blog.id],
                    tags  : req.param('tags'),
                    page  : req.param('page'),
                    base  : '/paid/f/'+blog.name,
                    blog  : blog.id,
                })
            })
            .then(function(data) {
                return res.render('blog/paid/1-col', data)
            })
            .catch(res.serverError)
    },

    // /paid/f/analytics/get/1
    paid_post: function(req, res) {
        var blog = req.param('blog');

        return Q()
            .then(function() {
                return Blog.findOne({name: blog});
            })
            .then(function(blog) {
                if (!blog) {
                    throw new Error(404);
                }
                return formatDataForSingle({
                    id: req.param('id'),
                    bc: [
                        {name: 'Home',    href: '/'},
                        {name: 'Paid',    href: '/paid'},
                        {name: blog.name, href: '/paid/f/'+blog.name},
                        {name: 'Post',    href: '/paid/f/'+blog.name+'/get/'+req.param('id')},
                    ],
                    feedUrl: '/paid/f/'+blog.name,
                })
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
                feedUrl: '/blog/',
            }, data)
        })
        .then(function() {
            return Post.getFormattedOne({id: data.id});
        })
        .then(function(post) {
            data.post      = post;
            data.title     = data.post.title;
            data.pageTitle = data.post.title;
        })
        .then(function() {
            return data;
        })
}
