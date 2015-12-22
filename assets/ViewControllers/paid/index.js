$(document).ready(function() {
    $('#createPortfolio').on('click', function() {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        popup.append('<h4>Enter portfolio name:</h4>');
        popup.append('<p class="comment">* It must be uniq</p>');
        popup.append('<input id="createPortfolioName" placeholder="Name">');

        var btns = $('<div class="mt-10"></div>');
            var ok = $(Jade.els.button('OK')).addClass('mr-10');
                ok.bind('click', function() {
                    cnt.mask();
                    $.post('/api/create_portfolio', {
                        msg: {
                            name: $('#createPortfolioName').val(),
                        }
                    })
                    .done(function(data) {
                        window.location.href = '/paid/p/edit/'+data.id;
                    })
                    .fail(mp.err)
                    .always(function() {
                        cnt.unmask();
                        $.magnificPopup.close();
                    })
                });
            var cancel = $(Jade.els.button('Cancel'));
                cancel.bind('click', function() {
                    $.magnificPopup.close();
                });
            btns.append(ok);
            btns.append(cancel);
        popup.append(btns);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });

    })
});

