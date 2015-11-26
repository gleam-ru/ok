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

};

