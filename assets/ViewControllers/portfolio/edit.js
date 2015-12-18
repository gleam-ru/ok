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
                '<kv-row',
                    ':k.sync="k"',
                    ':v.sync="v"',
                    '>',
                '</kv-row>',
            ].join(' '),
            data: {
                k: 'gazp',
                v: '138',
            },
            ready: function() {
                var vm = this;
            }
        })
    })

});
