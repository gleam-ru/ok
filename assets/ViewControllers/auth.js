$(document).ready(function() {

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var tab_hash = $(e.target).attr('href');
        location.hash = tab_hash;
    });


    activateTab(location.hash || '#signup');


});

function activateTab(hash) {
    $('.nav-tabs a[href="' + hash + '"]').tab('show');
}
