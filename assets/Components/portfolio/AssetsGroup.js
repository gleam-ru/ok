module.exports = function(resolve) {
    System.importAll({
        row: '/Components/portfolio/Row.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        return {
            components: {
                'kv-row': imported.row,
            },
            template: [
                '<kv-row v-for="row in assets"',
                    ':k.sync="row.k"',
                    ':v.sync="row.v"',
                    '@drop="droprow($index)"',
                    '>',
                '</kv-row>',
                '<div class="row" @click="addrow">'+Jade.els.iconButton('fa-plus')+'</div>',
            ].join(' '),
            props: ['assets'],
            methods: {
                droprow: function(index) {
                    this.assets.splice(index, 1);
                },
                addrow: function() {
                    this.assets.push({
                        k: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                        v: parseInt(Math.random() * 100),
                    });
                },
            },
            ready: function() {
                var vm = this;
            }
        }
    })
    .then(resolve)
    ;
}
