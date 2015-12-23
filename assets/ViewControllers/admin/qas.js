$(document).ready(function() {

    $('.fn-remove-qa').on('click', function() {
        var $el = $(this);
        var id = $el.data('id');
        mp.confirm('It is impossible to restore', function() {
            cnt.mask();
            $.post('/api/remove_qa', {
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
