/**
* Language.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        code: {type: 'string', unique: true},
        name: {type: 'string', unique: true},
    }

};

