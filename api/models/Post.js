/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var sanitize = require('sanitize-html');
var cheerio = require('cheerio');

module.exports = {

    attributes: {
        parent  : {model: 'Post'},

        author  : {model: 'User', required: true},
        editor  : {model: 'User'},

        title   : {type: 'text', defaultsTo: '', required: true},
        text    : {type: 'text', defaultsTo: ''},

        tags    : {
            collection : 'Tag',
            via        : 'posts',
        },

        blog    : {model: 'Blog', defaultsTo: 1},
        language: {model: 'Language', defaultsTo: 1},


        // preview for feed
        getPreview : function() {
            var me = this;
            if (!me.text) {
                return me;
            }
            var idx = me.text.indexOf('<hr>');
            var text = me.text.slice();
            if (idx + 1) {
                text = text.slice(0, idx);
            }
            else {
                text = text.slice(0, 700);
            }
            me.text = sanitize(text);
            return me;
        },

        update : function(_data) {
            var me = this;
            var data = _.extend({
                tags  : [],
                text  : '',
                title : 'No title',
            }, _data);

            var $ = cheerio.load(data.text)
            return Q()
                .then(function() {
                    return Post.findOne({id: me.id}).populate('tags');
                })
                // get tags instances
                .then(function(post) {
                    me = post;
                    data.tags = _.map(data.tags, function(tag) {
                        return {name: tag};
                    })
                    console.debug(data.tags)
                    if (!data.tags.length) {
                        return [];
                    }
                    else {
                        return Tag.findOrCreate(data.tags, data.tags);
                    }
                })
                // merge tags with post
                .then(function(tags) {
                    data.tags = undefined;

                    var existing = _.map(me.tags, 'id');
                    var needed   = _.map(tags, 'id');

                    var toDelete = _.difference(existing, needed);
                    var toAdd    = _.difference(needed, existing);
                    var tag;
                    _.each(toDelete, function(id) {
                        tag = _.find(me.tags, {id: id});
                        if (tag && tag.id) {
                            me.tags.remove(tag.id);
                        }
                    })
                    _.each(toAdd, function(id) {
                        tag = _.find(tags, {id: id});
                        if (tag && tag.id) {
                            me.tags.add(tag.id);
                        }
                    })
                })
                // upload images
                .then(function() {
                    var $imgs = $('img');
                    var tasks = [];
                    $imgs.each(function(i, img) {
                        var $img = $(img);
                        var data = $img.attr('src')
                        // картинка уже есть в аплоадах
                        if (data && data.indexOf('/uploads/') !== -1) {
                            return;
                        }
                        // загружаю картинку
                        tasks.push(
                            uploader
                                .uploadBase64Image(data, 'posts/'+me.id+'/')
                                .then(function(uploaded) {
                                    if (!uploaded) {
                                        console.warn('Картинка не загружена. Удаляю.')
                                        $img.remove();
                                    }
                                    else {
                                        $img.attr('src', '/uploads/posts/'+me.id+'/'+uploaded);
                                    }
                                })
                        );
                    })
                    return Q.all(tasks);
                })
                // merge post with other data
                .then(function() {
                    data.text = $.html();
                    if (me.id == data.parent) {
                        console.warn('tried to create recursive post!')
                        throw new Error('recursive parent!');
                    }
                    _.extend(me, data);
                })
                // save post
                .then(function() {
                    return me.save()
                })
        },



    },


    // destroys post with its children
    destroyWithChildren: function(params) {
        var Post = this;
        return Q.resolve()
            .then(function() {
                return Post.find(params);
            })
            .then(function(posts) {
                if (!posts || !Array.isArray(posts) || posts.length === 0) {
                    return Q();
                }
                else {
                    return Q.all(_.map(posts, function(post) {
                        return Q()
                            .then(function() {
                                return Post.find({parent: post.id});
                            })
                            .then(function(children) {
                                var beforeDestroy = Q();
                                if (!children || !Array.isArray(children) || children.length === 0) {
                                    // пост не является ни чьим родителем
                                }
                                else {
                                    // пост - родитель
                                    beforeDestroy = Q.all(_.map(children, function(child) {
                                        return Post.destroyWithChildren({id: child.id});
                                    }))
                                }
                                return Q()
                                    .then(beforeDestroy)
                                    .then(function() {
                                        console.debug('destroy', post.id, post.title);
                                        return post.destroy();
                                    });
                            });
                        }));
                }
            })
    },


    // получает примерно такое:
    // _.extend(post, {
    //     neighbors: [n, n, post, n,...],
    //     children: [c, c, c,...],
    // })
    getFormattedOne: function(params) {
        var Post = this;
        var accum = {};
        var result = {
            parent: undefined,
            children: [],
            neighbors: [],
        };
        return Post
            .findOne(params)
            .populateAll()
            .then(function(post) {
                accum.post = post;
                result = post.toJSON();
                return Post.find({parent: post.id});
            })
            .then(function(children) {
                result.children = children;
                return accum.post;
            })
            .then(function(post) {
                if (!post.parent) {
                    return Q()
                        .then(function() {
                            return _.extend(result, {
                                neighbors: [result],
                            });
                        })
                }
                else {
                    return Q()
                        .then(function() {
                            return Post.find({parent: post.parent.id});
                        })
                        .then(function(neighbors) {
                            return _.extend(result, {
                                neighbors: neighbors,
                            });
                        })
                }
            })
    }

};

