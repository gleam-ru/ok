/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    about: function(req, res) {
        var data = {
            pageTitle: 'About',
            title: 'About',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'About', href: '/about'},
            ]
        }
        return Q()
            .then(function() {
                return res.render('about', data)
            })
    }

};

