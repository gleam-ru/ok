/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var sanitize = require('sanitize-html');

module.exports = {

    attributes: {
        author  : {model: 'User', required: true},

        title   : {type: 'text', defaultsTo: '', required: true},
        text    : {type: 'text', defaultsTo: ''},

        tags    : {
            collection : 'Tag',
            via        : 'posts',
        },


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
            var data = _.clone(_data);
            return Q()
                .then(function() {
                    data.tags = _.map(data.tags, function(tag) {
                        return {name: tag};
                    })
                    return Tag.findOrCreate(data.tags, data.tags);
                })
                // tags
                .then(function(tags) {
                    data.tags = undefined;

                    var existing = _.map(me.tags, 'id');
                    var needed   = _.map(tags, 'id');

                    var toDelete = _.difference(existing, needed);
                    var toAdd    = _.difference(needed, existing);

                    _.each(toDelete, function(id) {
                        var tag = _.find(me.tags, {id: id});
                        me.tags.remove(tag);
                    })
                    _.each(toAdd, function(id) {
                        var tag = _.find(tags, {id: id});
                        me.tags.add(tag);
                    })

                    return me;
                })
                .then(function(me) {
                    _.extend(me, data);
                    return me.save()
                })
        },
    }

};

