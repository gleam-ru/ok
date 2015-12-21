module.exports = function(resolve) {
    System.importAll({
        _raw: [
        ]
    })
    .then(function() {
        return {
            template: [
                '<div class="col-md-12 vi-ag-row">',
                    '<input class="col-md-5 col-md-offset-1" type="text" v-model="k" placeholder="Name">',
                    '<input class="col-md-4 col-md-offset-1" type="text" v-model="v" placeholder="Value">',
                    '<div class="col-md-1">',
                        '<span @click="drop" @mouseenter="dropentered" @mouseleave="dropleaved">'+Jade.els.iconButton('fa-trash')+'</span>',
                    '</div>',
                '</div>',
            ].join(' '),
            props: ['k', 'v'],
            methods: {
                drop: function() {
                    this.$emit('drop');
                },
                dropentered: function(e) {
                    $(this.$el).addClass('hovered')
                },
                dropleaved: function(e) {
                    $(this.$el).removeClass('hovered')
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
