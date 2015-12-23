/**
 * QAController
 *
 * @description :: Server-side logic for managing QAS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        var data = {
            pageTitle: 'QA',
            title: 'QA',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'QA', href: '/qa'},
            ],
        }
        return Q()
            .then(function() {
                return res.render('qa', data)
            })
    },

};
