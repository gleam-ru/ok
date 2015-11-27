$(document).ready(function() {
    var ctx = $("#parts")[0].getContext("2d");

    window.parts = _.map(globalVars.parts, function(p) {
        p.label = p.name.slice();
        delete p.name;
        p.color = '#ccc';
        p.highlight = '#aaa';
        return p;
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if ($(e.target).attr('href') === '#tab_sec2') {
            new Chart(ctx).Pie(parts, {
                animationEasing: false,
                animationSteps : 1,
            });
        }
    })

});
