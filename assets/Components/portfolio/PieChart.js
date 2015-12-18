module.exports = function(resolve) {
    System.importAll({
        Highcharts: '/bower_components/highcharts/lib/highcharts.js',
        _raw: [

        ]
    })
    .then(function(imported) {
        var Highcharts = imported.Highcharts;
        return {
            template: [
                '<div id="fn-my-chart" style="min-height: 300px; border: solid 1px #ccc;">',
                '</div',
            ].join(' '),
            props: [],
            methods: {
            },
            ready: function() {
                var vm = this;
                $('#fn-my-chart').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Fruit Consumption'
                    },
                    xAxis: {
                        categories: ['Apples', 'Bananas', 'Oranges']
                    },
                    yAxis: {
                        title: {
                            text: 'Fruit eaten'
                        }
                    },
                    series: [{
                        name: 'Jane',
                        data: [1, 0, 4]
                    }, {
                        name: 'John',
                        data: [5, 7, 3]
                    }]
                });
            }
        }
    })
    .then(resolve)
    ;
}
