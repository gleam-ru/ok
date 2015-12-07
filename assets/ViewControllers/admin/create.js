$(document).ready(function() {
    initAlloy({
            storeAs: 'new_post'
        })
        .then(function(editor) {
            $('#save').on('click', function() {
                cnt.mask();
                var data = editor.save_ls();
                $.post('/create', {
                    msg: data,
                })
                .done(function(data) {
                    editor.clear_ls();
                    window.location.href = '/blog/get/'+data.id;
                })
                .fail(function(err) {
                    mp.alert('something went wrong...');
                    console.error(err);
                })
                .always(function() {
                    cnt.unmask();
                })
            })
        })

});
