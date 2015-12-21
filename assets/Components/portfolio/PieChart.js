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
                '<div class="vi-my-chart" style="min-height: 500px;">',
                '</div',
            ].join(' '),
            props: ['piedata'],
            watch: {
                piedata: function() {
                    this.redraw();
                }
            },
            methods: {
                getSeries: function() {
                    var vm = this;
                    var piedata = vm.piedata;
                    var result = {
                        inner: [],
                        outer: [],
                    };

                    var colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
                    var colors_len = 10 + 1; // в дальнейшем будет a % b
                    var total = 0; // для рассчета процентов
                    _.each(piedata, function(inner, i) {
                        var inner_color   = colors[i % colors_len];
                        var inner_ch_len  = inner.items.length;
                        result.inner.push({
                            name  : inner.name,
                            y     : inner.value,
                            color : inner_color,
                        })
                        total += inner.value;
                        _.each(inner.items, function(outer, i) {
                            var brightness = 0.2 - (i / inner_ch_len) / 5
                            result.outer.push({
                                name: outer.name,
                                y: outer.value,
                                color: Highcharts.Color(inner_color).brighten(brightness).get(),
                            })
                        })
                    })
                    console.log('recalculated')
                    return [
                        {
                            data: result.inner,
                            size: '60%',
                            dataLabels: {
                                formatter: function() {
                                    return this.y > 5 ? this.point.name : null;
                                },
                                color: '#ffffff',
                                distance: -30
                            }
                        }, {
                            data: result.outer,
                            size: '80%',
                            innerSize: '60%',
                            dataLabels: {
                                formatter: function() {
                                    // display only if larger than 1
                                    return this.y > 1 ? this.point.name + ': ' + (100*this.y/total).toFixed(3) + '%' : null;
                                }
                            }
                        }
                    ]
                    return result;
                },
                redraw: function() {
                    var vm = this;
                    window._chart = new Highcharts.Chart({
                        chart: {
                            renderTo: vm.$el,
                            type: 'pie',
                        },
                        title: {
                            text: 'Portfolio'
                        },
                        yAxis: {
                            title: {
                                text: 'Total percent market share'
                            }
                        },
                        plotOptions: {
                            pie: {
                                shadow: false,
                                center: ['50%', '50%'],
                                animation: false,
                            }
                        },
                        series: vm.getSeries(),
                    })

                }
            },
            ready: function() {
                var vm = this;
                window._pie = this;
                vm.redraw();
                var _el = $(this.$el);
                $(window).scroll(function() {
                    var scroll = $(window).scrollTop();
                    if (scroll > 140) {
                        _el.addClass('fixed');
                    }
                    else {
                        _el.removeClass('fixed');
                    }
                });
            }
        }
    })
    .then(resolve)
    ;
}
