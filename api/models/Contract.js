/**
* Contract.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        sum: { type: 'string' },
        name: { type: 'string' },
        number : { type: 'string' },
        currency: { type: 'string' }, // rub/usd
        transaction: { type: 'string' }, // card/bank
        transactionDate: { type: 'string' },

        signature: { type: 'text' },
    },

};

