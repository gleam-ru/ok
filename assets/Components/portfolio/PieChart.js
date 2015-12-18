module.exports = function(resolve) {
    System.importAll({
        _raw: [
        ]
    })
    .then(function() {
        return {
            template: [
                '<div style="min-height: 300px; border: solid 1px #ccc;">',
                '</div',
            ].join(' '),
            props: [],
            methods: {
            },
            ready: function() {
                var vm = this;
            }
        }
    })
    .then(resolve)
    ;
}
