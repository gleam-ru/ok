/**
 * PortfolioController
 *
 * @description :: Server-side logic for managing portfolios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    feed: function(req, res) {
        var data = {
            pageTitle : 'Portfolios',
            title     : 'Portfolios',
            bc: [
                {name: 'Home',       href: '/'},
                {name: 'Paid',       href: '/paid'},
                {name: 'Portfolios', href: '/paid/p'},
            ],
            base: '/paid/p',
        }
        return Q()
            .then(function() {
                return Portfolio.find();
            })
            .then(function(portfolios) {
                data.portfolios = _.map(portfolios, function(p) {
                    return {
                        id     : p.id,
                        name   : p.name,
                        text   : p.description,
                        result : parseInt(Math.random() * 100 - 50),
                    }
                })
            })
            .then(function() {
                return res.render('portfolio/paid/3-col', data)
            })
            .catch(res.serverError)
    },

    single: function(req, res) {
        var name = req.param('name');
        var data = {
            pageTitle : '',
            title     : '',
            bc: [
                {name: 'Home',       href: '/'},
                {name: 'Paid',       href: '/paid'},
                {name: 'Portfolios', href: '/paid/p'},
            ],
            base: '/paid/p',
        }
        return Q()
            .then(function() {
                return Portfolio.findOne({name: name});
            })
            .then(function(portfolio) {
                if (!portfolio) {
                    throw new Error(404);
                }
                data.portfolio = portfolio.toJSON();
                data.pageTitle = portfolio.name+' portfolio';
                data.title     = portfolio.name+' portfolio';
                data.portfolio = portfolio;
                data.bc.push({name: 'p', href: '/paid/p/'+portfolio.name});
            })
            .then(function() {
                return res.render('portfolio/paid/single', data)
            })
            .catch(res.serverError)
    },


    edit: function(req, res) {
        var id = parseInt(req.param('id'));

        var data = {
            pageTitle : '',
            title     : '',
            bc: [
                {name: 'Home',       href: '/'},
                {name: 'Paid',       href: '/paid'},
                {name: 'Portfolios', href: '/paid/p'},
            ],
            base: '/paid/p',
        }
        return Q()
            .then(function() {
                return Portfolio.findOne({id: id});
            })
            .then(function(portfolio) {
                if (!portfolio) {
                    throw new Error(404);
                }
                data.pageTitle = '"'+portfolio.name+'" portfolio';
                data.title     = '"'+portfolio.name+'" portfolio';
                data.portfolio = portfolio.toJSON();
                data.bc.push({name: 'p', href: '/paid/p/'+portfolio.name});
            })
            .then(function() {
                return res.render('portfolio/edit', data)
            })
            .catch(res.serverError)


    },

};

