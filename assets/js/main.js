installGlobals();
installJQMethods();
installMP();

$(document).ready(function() {
    window.cnt = $('.cnt');

    $(document).on('click', '.pagination a', function(e) {
        e.preventDefault();
        var $me = $(this);
        var page = $me.data('page');
        setUrlParam('page', page);
        return false;
    })

    System.config({
        baseURL: '/',
    });

    System.importAll = function(hash) {
        var hash = _.clone(hash);
        var results = {};
        return Promise.resolve()
            .then(function() {
                var raw = _.clone(hash._raw);
                delete hash._raw;
                return Promise.all(_.map(raw, function(src) {
                    return loadFile(src);
                }))
            })
            .then(function() {
                return Promise.all(_.map(hash, function(src, name) {
                    return System
                        .import(src)
                        .then(function(imported) {
                            results[name] = imported;
                        })
                }))
            })
            .then(function() {
                return results;
            })
            ;
    }

    // // tooltipster
    // $.fn.tooltipster('setDefaults', {
    //     theme: 'tooltipster-light',
    //     contentAsHTML: true,
    //     interactive: true
    // });

    // $('.tt').each(function() {
    //     var el = $(this);
    //     var opts = {};
    //     opts.position = 'bottom';
    //     opts.maxWidth = 350;

    //     if (el.hasClass('tt_interactive')) {
    //         opts.interactive = true;
    //         opts.interactiveTolerance = 100;
    //     }
    //     if (el.hasClass('tt_html')) {
    //         opts.contentAsHTML = true;
    //     }

    //     el.tooltipster(opts);
    // });
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

    window.getUrlParams = function() {
        var vars = {},
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    window.setUrlParam = function(key, value) {
        key = encodeURI(key);
        value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }

    // http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
    window.loadFile = function(filename, filetype) {
        if (!filetype) {
            var splitted = filename.split('.');
            filetype = splitted[splitted.length - 1];
        }
        return Promise.resolve()
            .then(function() {
                if (filetype == "js") {
                    return new Promise(function(resolve, reject) {
                        $.getScript(filename)
                            .done(resolve)
                            .fail(reject)
                    });
                }
                else if (filetype == "css") {
                    var fileref = document.createElement("link");
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
                else {
                    throw new Error('unknown file type');
                }
            })
    }
}



// JQuery methods on elements $().mask(), ...
function installJQMethods() {
    // disable interface parts
    $.fn.mask = function(state) {
        if(state === undefined || state) {
            // add mask
            var mask = $("<div id='mask'><img src='/images/loading.gif'/></div>");
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


    $(document).on('click', '.disabled', function(e) {
        e.preventDefault();
        return false;
    })
    $.fn.disable = function(state) {

        if(state === undefined || state) {
            // disable
            this.prop('disabled', 'disabled');
            this.addClass('disabled');
        }
        else {
            this.prop('disabled', false);
            this.removeClass('disabled');
        }

    }
    $.fn.enable = function() {
        this.disable(false);
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
        popup.append('<h2 class="mb-10">'+'Confirmation required!'+'</h2>');
        popup.append(html);

        var btns = $('<div class="mt-10"></div>');
            var ok = $(Jade.els.button('OK')).addClass('mr-10');
                ok.bind('click', function() {
                    cb();
                    $.magnificPopup.close();
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
            },
            modal: true
        });
    }
}
