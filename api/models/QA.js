/**
* Messages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        author  : {type: 'text', required: true},
        email   : {type: 'text', required: true},
        text    : {type: 'text', required: true},
    },

};

