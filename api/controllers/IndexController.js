/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
        var data = {
            pageTitle: 'Index',
            test: 'test_data',
        }
        Q()
            .then(function() {
                return Tag.find()
            })
            .then(function(tags) {
                data.tags = tags;
                return Q.all([
                    Blog.find(),
                    Post.find(),
                ])
            })
            .spread(function(blogs, posts) {
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

                data.tree = tree;
            })
            .then(function() {
                return res.render('index', data);
            })
            .catch(res.serverError)
    },

};


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
