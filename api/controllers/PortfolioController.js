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
                // if (!portfolio) {
                //     throw new Error(404);
                // }
                // data.portfolio = portfolio.toJSON();
                portfolio = {
                    id: 999,
                    name: 'Fake portfolio',
                    assets: [
                        {name: 'GAZP',  value: 25.64},
                        {name: 'SBERP', value: 10.23},
                        {name: 'MTLR',  value: 5.64},
                        {name: 'MMKK',  value: 5.53},
                        {name: 'URKA',  value: 5.18},
                        {name: 'NLMK',  value: 4.66},
                        {name: 'MTSS',  value: 4.37},
                        {name: 'AFLT',  value: 4.07},
                        {name: 'VTBR',  value: 3.68},
                        {name: 'ALRS',  value: 3.40},
                        {name: 'RASP',  value: 3.29},
                        {name: 'RSTL',  value: 3.16},
                        {name: 'MOEN',  value: 3.04},
                        {name: 'HYDR',  value: 2.75},
                        {name: 'PPIK',  value: 2.54},
                        {name: 'OAKK',  value: 2.48},
                        {name: 'MVID',  value: 2.21},
                        {name: 'OGKK',  value: 2.09},
                        {name: 'AVAZ',  value: 1.87},
                        {name: 'RSTP',  value: 1.66},
                        {name: 'BSPR',  value: 1.27},
                        {name: 'SEVS',  value: 0.06},
                    ],
                    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }
                data.pageTitle = portfolio.name+' portfolio';
                data.title     = portfolio.name+' portfolio';
                data.portfolio = portfolio;
                data.bc.push({name: 'p', href: '/paid/p/'+portfolio.name});
            })
            .then(function() {
                return res.render('portfolio/paid/single', data)
            })
    }

};

