/**
* Portfolio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name        : {type: 'string', required: true, unique: true},
        assets      : {type: 'array', defaultsTo: []},
        description : {type: 'text', defaultsTo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},

    }
};