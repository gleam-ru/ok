var Q             = require('Q');
var pageSize      = sails.config.app.pageSize;
var feed = {};

// формирует список постов, удовлетворяющих
// указанным параметрам, которые выглядят примернт так:
// {
//      types : '' || [],
//      page  : 1,
//      tags  : '' || [],
// }
//
feed.get = function(params) {
    params = params || {};
    var types = Array.isArray(params.types) ? params.types : [params.types];
    var tags = Array.isArray(params.tags) ? params.tags : [params.tags];
    var currentPage = params.page || 0;

    var pagination = {};

    return Q.all([
            getPostsByTypes(types),
            getPostsByTags(tags),
        ])
        .then(boolAnd)
        .then(function(posts) {
            // pagination logic...
            if (currentPage) {
                var total = posts.length;
                var from = pageSize * (currentPage - 1);
                var to = pageSize * currentPage;
                // last page
                if (from > total || to >= total) {
                    from = total - ((total % pageSize) || pageSize);
                    to = total;
                }
                pagination.total   = Math.ceil(total / pageSize);
                pagination.current = Math.ceil(to / pageSize);
                posts = posts.slice(from, to);
            }
            return posts;
        })
        .then(function(posts) {
            return Q.all(_.map(posts, function(post) {
                return post.getPreview();
            }))
        })
        .then(function(posts) {
            return Q.all([posts, pagination])
        })

}


module.exports = feed;

function boolAnd(data) {
    if (!data || !data.length) {
        return [];
    }
    var results = _.map(data[0], 'id');
    for (var i = 1; i < data.length; i++) {
        var part = _.map(data[i], 'id');
        results = _.intersection(results, part);
    }
    return Post
        .find({id: results})
        .populateAll()
        .then(boolOr)
}

function boolOr(data) {
    return _(data)
        .flatten()
        .sortBy('id')
        .uniq(true, 'id')
        .compact()
        .sortBy('createdAt')
        .value()
        .reverse()
        ;
}

// получает посты по всем тегам, указанным в списке
function getPostsByTags(list) {
    return Q
        .all(_.map(list, getPostsByTag))
        .then(boolOr)
}

// получает посты по всем типам, указанным в списке
function getPostsByTypes(list) {
    return Q
        .all(_.map(list, getPostsByType))
        .then(boolOr)
}


// получает посты по типу
function getPostsByType(id) {
    if (!id) {
        return Post.find().populateAll();
    }
    else {
        return Blog
            .findOne({id: id})
            .populate('posts')
            .then(function(blog) {
                return blog.posts;
            });
    }
}


// получает посты по тегу
function getPostsByTag(name) {
    if (!name) {
        return Post.find().populateAll();
    }
    else {
        return Tag
            .findOne({name: name})
            .populate('posts')
            .then(function(tag) {
                return tag.posts;
            });
    }
}
