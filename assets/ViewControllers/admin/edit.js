$(document).ready(function() {
    initAlloy({
            storeAs: false,
        })
        .then(function(editor) {
            $('#save').on('click', function() {
                cnt.mask();
                var data = editor.save_ls();
                $.post('/api/update_post', {
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

            $('#deletePost').on('click', function() {
                mp.confirm('This post will be deleted. Process?', function() {
                    cnt.mask();
                    $.post('/api/remove_post', {
                        id: editor.save_ls().id,
                    })
                    .done(function(data) {
                        window.location.href = '/';
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
        })

});
