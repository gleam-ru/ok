$(document).ready(function() {



    $('.fn-buy-now').on('click', function() {
        var id = $(this).data('id');
        var rate = _.find(globalVars.rates, {id: id});
        var user = globalVars.user || {};
        mp.confirm([

            '<div>',
                '<h4 class="margin-two">',
                    'You want to buy: <b>"'+rate.name+'"</b>',
                '</h4>',
                '<input type="text" name="name"  id="buyNowNameInput"  placeholder="Your Name"  value="'+((user.surname && user.name) ? user.surname+' '+user.name : '')+'" />',
                '<input type="text" name="phone" id="buyNowPhoneInput" placeholder="Your Phone" value="'+(user.phone || '')+'" />',
                '<input type="text" name="email" id="buyNowEmailInput" placeholder="Your email" value="'+(user.email || '')+'" />',
            '</div>',
            ].join(' '),

            function() {
                post({
                    rate  : rate,
                    name  : $('#buyNowNameInput').val(),
                    phone : $('#buyNowPhoneInput').val(),
                    email : $('#buyNowEmailInput').val(),
                })
            }
        )
    });



    $('#careersform').on('submit', function(e) {
        e.preventDefault();
        post({
            rate  : _.find(globalVars.rates, {id: parseInt($('#selectposition').val())}),
            name  : $('#name').val(),
            phone : $('#phone').val(),
            email : $('#email').val(),
        })
        return false;
    })


});


function post(msg) {
    cnt.mask();
    $.post('/', {
        msg: msg
    })
    .done(function() {
        mp.confirm('Your message has been sent. We\'ll contact you in 48 hours', function() {
            window.location.href = '/';
        })
    })
    .fail(mp.err)
    .always(function() {
        cnt.unmask();
    })
}
