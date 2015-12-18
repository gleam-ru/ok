$(document).ready(function() {
    System.importAll({
        row: '/Components/portfolio/Row.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        window.vm = new Vue({
            el: '#vue',
            components: {
                'kv-row': imported.row,
            },
            template: [
                '<kv-row v-for="row in rows"',
                    ':k.sync="row.k"',
                    ':v.sync="row.v"',
                    '@drop="droprow($index)"',
                    '>',
                '</kv-row>',
                '<div class="row" @click="addrow">'+Jade.els.iconButton('fa-plus')+'</div>',
            ].join(' '),
            data: {
                rows: [
                    {k: 'gazp', v: 138},
                    {k: 'rasp', v: 105},
                    {k: 'mltr', v: 130},
                ],
            },
            methods: {
                droprow: function(index) {
                    this.rows.splice(index, 1);
                },
                addrow: function() {
                    this.rows.push({
                        k: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                        v: parseInt(Math.random() * 100),
                    });
                },
            },
            ready: function() {
                var vm = this;
            }
        })
    })

});
