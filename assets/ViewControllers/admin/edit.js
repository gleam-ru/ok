$(document).ready(function() {
    initAlloy({
            storeAs: false,
        })
        .then(function(editor) {
            $('#save').on('click', function() {
                cnt.mask();
                var data = editor.save_ls();
                $.post('/edit', {
                    msg: data,
                })
                .done(function(data) {
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
