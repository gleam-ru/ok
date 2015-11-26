/**
 * PaidController
 *
 * @description :: Server-side logic for managing paids
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        var data = {
            pageTitle: 'Paid',
            title: 'Paid',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
            ],

            tiles: [
                {
                    title: 'Assets allocation',
                    url: '/paid/allocation',
                    image: 'pie.jpg',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'Active ideas',
                    url: '/paid/ideas',
                    image: 'ideas.jpg',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'Archive',
                    url: '/paid/archive',
                    image: 'archive.jpg',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }
            ],
        }
        return Q()
            .then(function() {
                return res.render('paid', data)
            })
    },



    ideas: function(req, res) {
        var data = {
            pageTitle: 'Ideas',
            title: 'Ideas',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
                {name: 'Ideas', href: '/paid/ideas'},
            ],

            ideas: [
                {
                    title: 'URKA',
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'SBERP',
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'GAZP',
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'LKOH',
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'MTLR',
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }
            ],
        }
        return Q()
            .then(function() {
                return res.render('paid/ideas', data)
            })
    },

};

