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
    },

    landing: function(req, res) {
        var data = {
            pageTitle: 'Rumex',
            title: 'Rumex',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Landing', href: '/landing_2'},
            ]
        };
        return res.render('landing_2', data);
    },

    landing_old: function(req, res) {
        var data = {
            pageTitle: 'Rumex',
            title: 'Rumex',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Landing', href: '/landing'},
            ]
        };
        return res.render('landing', data);
    },

};

