module.exports = function(resolve) {
    System.importAll({
        _raw: [
        ]
    })
    .then(function() {
        return {
            template: [
                '<div class="row">',
                    '<input class="col-md-5" type="text" v-model="k"  placeholder="Name">',
                    '<input class="col-md-5" type="text" v-model="v" placeholder="Value">',
                    '<div class="col-md-2" @click="drop">'+Jade.els.iconButton('fa-trash')+'</div>',
                '</div',
            ].join(' '),
            props: ['k', 'v'],
            methods: {
                drop: function() {
                    this.$emit('drop');
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
