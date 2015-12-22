$(document).ready(function() {
    System.importAll({
        Highcharts: '/bower_components/highcharts/lib/highcharts.js',
        pc: '/Components/portfolio/PieChart.js',
        _raw: [
        ]
    })
    .then(function(imported) {
        var Highcharts = imported.Highcharts;
        // пошли костыли...
        // а все потому, что мне лень много писать.
        imported.pc(function(cmp) {
            new Highcharts.Chart({
                chart: {
                    renderTo: $('#pieChart')[0],
                    type: 'pie',
                },
                title: {
                    text: 'Result',
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        center: ['50%', '50%'],
                        animation: false,
                    }
                },
                series: cmp.methods.getSeries.call({
                    piedata: _.map(globalVars.parts, function(p) {
                        return {
                            name: p.name,
                            value: _.sum(p.tickers, 'v'),
                            items: _.map(p.tickers, function(t) {
                                return {
                                    name: t.k,
                                    value: parseInt(t.v),
                                }
                            })
                        }
                    })
                }),
            })
        })
    })
});
