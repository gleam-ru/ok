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
                '<div class="vi-ag row">',
                    '<div class="col-md-12 vi-group-name">',
                        '<input class="col-md-4" class="row" v-model="name" placeholder="Group name">',
                        '<div class="col-md-1">',
                            '<span @click="drop" @mouseenter="dropentered" @mouseleave="dropleaved">'+Jade.els.iconButton('fa-trash')+'</span>',
                        '</div>',
                    '</div>',
                    '<kv-row v-for="row in tickers"',
                        ':k.sync="row.k"',
                        ':v.sync="row.v"',
                        '@drop="droprow($index)"',
                        '>',
                    '</kv-row>',
                    '<div class="col-md-12 vi-ag-row">',
                        '<div class="col-md-offset-1">',
                            '<span @click="addrow">'+Jade.els.iconButton('fa-plus')+'</span>',
                        '</div>',
                    '</div>',
                    '<div class="col-md-12 no-padding">',
                        Jade.els.separator(),
                    '</div>',
                '</div>',
            ].join(' '),
            props: ['name', 'tickers',],
            methods: {
                drop: function() {
                    this.$emit('drop');
                },
                droprow: function(index) {
                    this.tickers.splice(index, 1);
                },
                addrow: function() {
                    this.tickers.push({
                        k: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                        v: parseInt(Math.random() * 100),
                    });
                },
                dropentered: function(e) {
                    $(e.target).closest('.vi-ag').addClass('hovered')
                },
                dropleaved: function(e) {
                    $(e.target).closest('.vi-ag').removeClass('hovered')
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
