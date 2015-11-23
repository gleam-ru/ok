installGlobals();
installJQMethods();
installMP();

$(document).ready(function() {
    window.cnt = $('.cnt');

    // tooltipster
    $.fn.tooltipster('setDefaults', {
        theme: 'tooltipster-light',
        contentAsHTML: true,
        interactive: true
    });

    $('.tt').each(function() {
        var el = $(this);
        var opts = {};
        opts.position = 'bottom';
        opts.maxWidth = 350;

        if (el.hasClass('tt_interactive')) {
            opts.interactive = true;
            opts.interactiveTolerance = 100;
        }
        if (el.hasClass('tt_html')) {
            opts.contentAsHTML = true;
        }

        el.tooltipster(opts);
    });
});


//////////////////////
// Global variables //
//////////////////////
function installGlobals() {
    // compiled jade
    window.Jade = templatizer;
    // удаляю trailing slashes
    window.href = window.location.pathname.replace(/\/$/, "");
    // Default Date Format
    window.ddf = 'YYYY-MM-DD';
}



// JQuery methods on elements $().mask(), ...
function installJQMethods() {
    // disable interface parts
    $.fn.mask = function(state) {
        if(state === undefined || state) {
            // add mask
            var mask = $("<div id='mask'><img src='/img/loading.png'/></div>");
            if (this.find('#mask').length > 0) return;
            this.append(mask);

        }
        else {
            // remove mask
            this.find('#mask').fadeOut(500, function(){ $(this).remove();});
        }

        $('#mask img').css('margin-top',($('body').scrollTop())+200);
    }
    $.fn.unmask = function() {
        this.mask(false);
    }

    // уведомление об результате действия
    // state - true/false (success/fail)
    // cb - cb.
    $.fn.done = function(state, cb) {
        var el = this;
        if (typeof cb !== 'function') cb = function() {};
        var mask;
        if(state) {
            mask = $("<div id='done'><img src='/img/success.png' /></div>");
        }
        else {
            mask = $("<div id='done'><img src='/img/fail.png' /></div>");
        }
        if (el.find('#done').length > 0) return;
        el.append(mask);
        setTimeout(function() {
            el.find('#done').fadeOut(200, function(){ $(this).remove();});
            cb();
        }, 300);
    }
}



/////////////////////
// Magnific Popups //
/////////////////////
function installMP() {
    // magnific popups
    window.mp = {};
    // замена стандартному алерту
    window.mp.alert = function(html) {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        // popup.append('<h3>Внимание!</h3>');
        popup.append(html);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });
    }
    // замена стандартному confirm
    window.mp.confirm = function(html, cb) {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        popup.append('<h3>'+__('Need_conf')+'</h3>');
        popup.append(html);

        var btns = $('<div></div>');
            var ok = $(Jade.els.button('OK')).addClass('mr-10');
                ok.bind('click', function() {
                    cb();
                    $.magnificPopup.close();
                });
            var cancel = $(Jade.els.button(__('Cancel')));
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
            },
            modal: true
        });
    }
}
