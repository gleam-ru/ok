$(document).ready(function() {
    System.importAll({
        ag: '/Components/portfolio/AssetsGroup.js',
        pc: '/Components/portfolio/PieChart.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        Vue.config.debug = true;
        window.vm = new Vue({
            el: '#vue',
            components: {
                'assets-group': imported.ag,
                'pie-chart': imported.pc,
            },
            template: [
                '<div class="row">',
                    '<div class="col-md-4 vi-assets">',
                        '<assets-group v-for="ag in assets"',
                            ':name.sync="ag.name"',
                            ':tickers.sync="ag.tickers"',
                            '@drop="dropassets($index)"',
                            '>',
                        '</assets-group>',
                        '<div class="row">',
                            '<span @click="addassets">'+Jade.els.iconButton('fa-plus')+'</span>',
                        '</div>',
                    '</div>',
                    '<pie-chart class="col-md-7 col-md-offset-1"',
                        ':piedata="piedata"',
                        '>',
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
            computed: {
                piedata: function() {
                    var data = [];
                    _.each(this.assets, function(group) {
                        var parent = {
                            name: group.name,
                            value: 0,
                            items: [],
                        };
                        _.each(group.tickers, function(row) {
                            var child = {
                                name: row.k,
                                value: parseFloat(row.v) || 0,
                            }
                            parent.value += child.value;
                            parent.items.push(child);
                        })
                        data.push(parent);
                    })
                    return data;
                },
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
