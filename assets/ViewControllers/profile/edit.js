$(document).ready(function() {
    $('#saveBtn').on('click', processForm)
});

function processForm() {
    var $form = $('#form');

    var name    = $form.find('.fn-name');
    var surname = $form.find('.fn-surname');
    var email   = $form.find('.fn-email');
    var pass0   = $form.find('.fn-pass0');
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


    if (pass1.val() || pass2.val()) {
        if (!pass0.val()) {
            pass0.addClass('has-error')
            hasError = true;
        }
        else {
            pass0.removeClass('has-error')
        }

        if (pass1.val() !== pass2.val()) {
            pass1.addClass('has-error')
            pass2.addClass('has-error')
            hasError = true;
        }
        else {
            pass1.removeClass('has-error')
            pass2.removeClass('has-error')
        }

    }



    if (hasError) {
        return false;
    }
    else {
        $form.submit();
    }
}
