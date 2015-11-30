$(document).ready(function() {

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var tab_hash = $(e.target).attr('href');
        location.hash = tab_hash;
        $.cookie('auth_tab', location.hash);
    });

    var lastActive = $.cookie('auth_tab');
    var wasRegistered = $.cookie('was_registered');
    var defaultTab = wasRegistered ? '#signup' : '#signin';
    activateTab(location.hash || lastActive || defaultTab);

    var $form = $('#signup');
    $('#signupBtn').on('click', function() {
        var name    = $form.find('.fn-name');
        var surname = $form.find('.fn-surname');
        var email   = $form.find('.fn-email');
        var pass1   = $form.find('.fn-pass1');
        var pass2   = $form.find('.fn-pass2');

        var hasError = false;

        if (!name.val()) {
            name.addClass('has-error')
            hasError = true;
        }
        else {
            name.removeClass('has-error')
        }

        if (!surname.val()) {
            surname.addClass('has-error')
            hasError = true;
        }
        else {
            surname.removeClass('has-error')
        }

        if (!email.val()) {
            email.addClass('has-error')
            hasError = true;
        }
        else {
            email.removeClass('has-error')
        }

        if (!pass1.val()) {
            pass1.addClass('has-error')
            hasError = true;
        }
        else {
            pass1.removeClass('has-error')
        }

        if (!pass2.val()) {
            pass2.addClass('has-error')
            hasError = true;
        }
        else {
            pass2.removeClass('has-error')
        }

        if ((!pass1.val() && !pass2.val()) || pass1.val() !== pass2.val()) {
            pass1.addClass('has-error')
            pass2.addClass('has-error')
            hasError = true;
        }
        else {
            pass1.removeClass('has-error')
            pass2.removeClass('has-error')
        }

        if (hasError) {
            return false;
        }
        else {
            $form.submit();
        }
    })


    $('#signinBtn').on('click', function() {
        $('#signin').submit();
    })



});

function activateTab(hash) {
    $('.nav-tabs a[href="' + hash + '"]').tab('show');
}
