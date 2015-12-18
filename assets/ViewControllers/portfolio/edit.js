$(document).ready(function() {
    System.importAll({
        ag: '/Components/portfolio/AssetsGroup.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        window.vm = new Vue({
            el: '#vue',
            components: {
                'assets-group': imported.ag,
            },
            template: [
                '<assets-group',
                    ':name.sync="name"',
                    ':shares.sync="shares"',
                    // '@drop="droprow($index)"',
                    '>',
                '</assets-group>',
                // '<div class="row" @click="addrow">'+Jade.els.iconButton('fa-plus')+'</div>',
            ].join(' '),
            data: {
                shares: [
                    {k: 'gazp', v: 138},
                    {k: 'rasp', v: 105},
                    {k: 'mltr', v: 130},
                ],
                name: 'Shares',
            },
            methods: {
            },
            ready: function() {
                var vm = this;
            }
        })
    })

});
