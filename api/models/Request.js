/**
* Messages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        type          : {type: 'text', required: true},

        author_name   : {type: 'text'},
        author_phone  : {type: 'text'},
        author_email  : {type: 'text'},

        data          : {type: 'json', defaultsTo: {}},
    },

};

