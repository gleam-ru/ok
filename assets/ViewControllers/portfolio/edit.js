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
                '<div>',
                    '<h4 class="row mb-10">',
                        'Portfolio description',
                    '</h4>',
                    '<div class="row">',
                        '<textarea v-model="description" placeholder="Portfolio description"></textarea>',
                    '</div>',
                    '<h4 class="row mb-10 vi-assets-editor-header">',
                        'Portfolio assets',
                        '<span @click="addassets" class="ml-10" style="vertical-align: sub;">',
                            Jade.els.iconButton('fa-plus'),
                        '</span>',
                    '</h4>',
                    '<div class="row">',
                        '<div class="col-md-4 vi-assets">',
                            '<assets-group v-for="ag in assets"',
                                ':name.sync="ag.name"',
                                ':tickers.sync="ag.tickers"',
                                '@drop="dropassets($index)"',
                                '>',
                            '</assets-group>',
                        '</div>',
                        '<pie-chart class="col-md-7 col-md-offset-1"',
                            ':piedata="piedata"',
                            '>',
                        '</pie-chart>',
                    '</div>',
                    '<div class="row">',
                        '<span @click="save">',
                            Jade.els.revealButton('fa-save', 'Save'),
                        '</span>',
                    '</div>',
                '</div>',
            ].join(' '),
            data: {
                id          : globalVars.portfolio.id,
                description : globalVars.portfolio.description,
                assets      : globalVars.portfolio.assets,
                // assets: [
                //     {
                //         name: 'Bonds',
                //         tickers: [
                //             {k: 'bond_1', v: 138},
                //             {k: 'bond_2', v: 105},
                //             {k: 'bond_3', v: 130},
                //         ],
                //     }, {
                //         name: 'Shares',
                //         tickers: [
                //             {k: 'gazp', v: 138},
                //             {k: 'rasp', v: 105},
                //             {k: 'mltr', v: 130},
                //         ],
                //     }
                // ],
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
                    return data.reverse();
                },
            },
            methods: {
                dropassets: function(idx) {
                    this.assets.splice(idx, 1);
                },
                addassets: function() {
                    this.assets.unshift({
                        name: '',
                        tickers: [],
                    });
                },
                save: function() {
                    var vm = this;
                    cnt.mask();
                    $.post('/api/update_portfolio', {
                        msg: {
                            id: vm.id,
                            assets: vm.assets,
                            description: vm.description,
                        }
                    })
                    .done(function(data) {
                        window.location.href = '/paid/p/'+data.name;
                    })
                    .fail(function(err) {
                        console.error(err);
                        mp.alert('smth went wrong...');
                    })
                    .always(function() {
                        cnt.unmask();
                    })
                },
            },
            ready: function() {
                var vm = this;
            }
        })
    })



    $('#deleteItem').on('click', function() {
        mp.confirm('Resoring is not possible. Continue?', function() {
            cnt.mask();
            $.post('/api/remove_portfolio', {
                id: vm.id,
            })
            .done(function() {
                window.location.href = '/paid/p';
            })
            .fail(function(err) {
                console.error(err);
                mp.alert('smth went wrong...');
            })
            .always(function() {
                cnt.unmask();
            })
        })
    })


});
