$(document).ready(function() {
    System.importAll({
        ag: '/Components/portfolio/AssetsGroup.js',
        pc: '/Components/portfolio/PieChart.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        window.vm = new Vue({
            el: '#vue',
            components: {
                'assets-group': imported.ag,
                'pie-chart': imported.pc,
            },
            template: [
                '<div class="row">',
                    '<div class="col-md-6">',
                        '<assets-group v-for="ag in assets"',
                            ':name.sync="ag.name"',
                            ':tickers.sync="ag.tickers"',
                            '@drop="dropassets($index)"',
                            '>',
                        '</assets-group>',
                        '<div class="row" @click="addassets">'+Jade.els.iconButton('fa-plus')+'</div>',
                    '</div>',
                    '<pie-chart class="col-md-6">',
                    '</pie-chart>',
                '</div>',
            ].join(' '),
            data: {
                assets: [
                    {
                        name: 'Bonds',
                        tickers: [
                            {k: 'bond_1', v: 138},
                            {k: 'bond_2', v: 105},
                            {k: 'bond_3', v: 130},
                        ],
                    }, {
                        name: 'Shares',
                        tickers: [
                            {k: 'gazp', v: 138},
                            {k: 'rasp', v: 105},
                            {k: 'mltr', v: 130},
                        ],
                    }
                ],

            },
            methods: {
                dropassets: function(idx) {
                    this.assets.splice(idx, 1);
                },
                addassets: function() {
                    this.assets.push({
                        name: '',
                        tickers: [],
                    });
                },
            },
            ready: function() {
                var vm = this;
            }
        })
    })

});
