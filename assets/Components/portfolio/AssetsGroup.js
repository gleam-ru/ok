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
                '<div class="row">',
                    '<input class="col-md-3" class="row" v-model="name">',
                    '<div class="col-md-2" @click="drop">'+Jade.els.iconButton('fa-trash')+'</div>',
                '</div>',
                '<kv-row style="margin-left: 20px;" v-for="row in shares"',
                    ':k.sync="row.k"',
                    ':v.sync="row.v"',
                    '@drop="droprow($index)"',
                    '>',
                '</kv-row>',
                '<div style="margin-left: 20px;" class="row" @click="addrow">'+Jade.els.iconButton('fa-plus')+'</div>',
            ].join(' '),
            props: ['name', 'shares',],
            methods: {
                drop: function() {
                    this.$emit('drop');
                },
                droprow: function(index) {
                    this.shares.splice(index, 1);
                },
                addrow: function() {
                    this.shares.push({
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
