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
            })
            .then(function() {
                return res.render('index', data);
            })
            .catch(res.serverError)
    },

};
