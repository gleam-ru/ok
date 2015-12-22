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
        };

        return Q.all([
                Blog.find({access: {'>': 1}}),
                Portfolio.find(),
            ])
            .spread(function(blogs, portfolios) {
                data.portfolios = _.map(portfolios, function(portfolio) {
                    return {
                        title       : portfolio.name,
                        url         : '/paid/p/'+portfolio.name,
                        description : portfolio.description,
                    }
                })
                data.blogs = _.map(blogs, function(blog) {
                    return {
                        title       : blog.name,
                        url         : '/paid/f/'+blog.name,
                        image       : blog.img,
                        description : blog.description,
                    }
                })
            })
            .then(function() {
                return res.render('paid', data)
            })
    },



    pay: function(req, res) {
        var data = {
            pageTitle: 'Paid',
            title: 'Paid',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
            ],

            rates: [
                {
                    id: 1,
                    name: 'First decision',
                    description: 'Lorem Ipsum is simply dummy text',
                    price: '100$',
                    overview: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    responsibilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    id: 2,
                    name: 'One more',
                    description: 'Lorem Ipsum is simply dummy text',
                    price: '10$',
                    overview: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    responsibilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    id: 3,
                    hot: true,
                    name: 'And our greatest',
                    description: 'Lorem Ipsum is simply dummy text',
                    price: '1000$',
                    overview: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    responsibilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }
            ],
        }
        return Q()
            .then(function() {
                return res.render('paid/pay', data)
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



    idea: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.notFound();
        }
        var data = {
            pageTitle: 'Ideas',
            title: 'Ideas',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
                {name: 'Ideas', href: '/paid/ideas'},
                {name: 'Idea_'+id, href: '/paid/idea/get/1'},
            ],

            idea: {
                description: '',
            },
        }
        data.idea.description += "<h2 class='mb-10'>Добрый день.</h2>"
        data.idea.description += "<p>"
        data.idea.description +=     "Сегодня хотим обратить Ваше внимание на акции Уралкалия, которые торгуются с 30%-м дисконтом к аналогам. Этот дисконт связан с недавним снижением котировок на фоне новостей об исключении акций Уралкалия из индекса MSCI."
        data.idea.description += "<img src='/images/paid/ideas/1/unnamed.gif' style='height: 330px; margin: 20px 0px; display: block;' />"
        data.idea.description += "</p>"
        data.idea.description += "<p>"
        data.idea.description +=     "На наш взгляд, новость уже отыграна рынком и дальнейших продаж, в связи с исключением из MSCI, не будет. Это позволит инвесторам сосредоточить свое внимание на фундаментальных показателях компании. Также стоит отметить, что слухи об обратном выкупе акций до сих пор официально не подтвердились. Однако консенсус прогноз аналитиков таков, что если выкуп акций все-таки будет, то цена выкупа будет около 16$, что существенно выше рынка. "
        data.idea.description += "</p>"
        data.idea.description += "<p>"
        data.idea.description +=     "С технической точки зрения акции консолидируются у горизонтального уровня 153 рубля, что является хорошим моментом для покупки."
        data.idea.description += "</p>"
        data.idea.description += "<p>"
        data.idea.description +=     "Рекомендуем купить акции Уралкалия не выше 157 рублей."
        data.idea.description += "<br />"
        data.idea.description +=     "Цель: 180 рублей (<span class='percent_green'>+14.6%</span>)."
        data.idea.description += "</p>"
        return Q()
            .then(function() {
                return res.render('paid/idea', data)
            })
    },



    archive: function(req, res) {
        var data = {
            pageTitle: 'Archive',
            title: 'Archive',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Paid', href: '/paid'},
                {name: 'Archive', href: '/paid/archive'},
            ],

            ideas: [
                {
                    title: 'URKA',
                    result: 13.1,
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'SBERP',
                    result: 146.5,
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'GAZP',
                    result: -5.2,
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'LKOH',
                    result: 7.3,
                    url: '/paid/ideas/get/1',
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                }, {
                    title: 'MTLR',
                    result: -20.0,
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

