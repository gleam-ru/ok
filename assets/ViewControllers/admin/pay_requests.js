$(document).ready(function() {

    $('.fn-remove-request').on('click', function() {
        var $el = $(this);
        var id = $el.data('id');
        mp.confirm('It is impossible to restore', function() {
            cnt.mask();
            $.post('/api/remove_pay_request', {
                id: id,
            })
            .done(function() {
                $el.closest('tr').remove();
            })
            .fail(mp.err)
            .always(function() {
                cnt.unmask();
            })
        })
    })

});
