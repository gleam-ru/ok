// ie8 support... omg...
window.msieversion = function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var res = false;
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
        res = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) < 10;
    return res;
}


// compiled jade
window.Jade = templatizer;
// удаляю trailing slashes
window.href = window.location.pathname.replace(/\/$/, "");

// tinymce defaults
window.tinymce_defaults = {
    min_width: 500,
    min_height: 400,
    selector: "textarea",
    language_url: '/js/tinymce/lang/'+($.cookie('currentLang') || 'ru')+'.js',
    theme: "modern",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen code",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern imagetools example",
    ],
    toolbar1: "fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
    toolbar2: "print preview | forecolor backcolor emoticons | habracut | example",
    image_advtab: true,
    relative_urls: false,
    fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
    setup: function(editor) {
        editor.addButton('habracut', {
            type: 'button',
            text: __('preview'),
            tooltip: 'Все, что выше, будет отображено для предпросмотра',
            icon: false,
            onclick: function() {
                var old = editor.getBody().getElementsByClassName('habracut');
                _.each(old, function(hc) {
                    hc.remove();
                })
                // НЕ МЕНЯТЬ!!! Роман.
                editor.insertContent('<hr class="habracut" />');
            },
        });
    },
}

// fancytree defaults
window.fancytree_defaults = {
    // https://github.com/mar10/fancytree/wiki/ExtPersist
    extensions: ["persist", "filter"],
    persist: {
        // Available options with their default:
        cookieDelimiter: "~", // character used to join key strings
        cookiePrefix: 'fancytree-techs-', // 'fancytree-<treeId>-' by default
        cookie: { // settings passed to jquery.cookie plugin
            raw: true,
            expires: "",
            path: "",
            domain: "",
            secure: false
        },
        expandLazy: false, // true: recursively expand and load lazy nodes
        overrideSource: true, // true: cookie takes precedence over `source` data attributes.
        store: "auto", // 'cookie': use cookie, 'local': use localStore, 'session': use sessionStore
        types: "expanded" // which status types to store
    },
    filter: {
        autoApply: true, // Re-apply last filter if lazy data is loaded
        counter: true, // Show a badge with number of matching child nodes near parent icons
        hideExpandedCounter: false, // Hide counter badge, when parent is expanded
        mode: "hide", // "dimm": Grayout unmatched nodes, "hide": remove unmatched nodes
        highlight: true
    }
}

// http://localhost:2345/tech/new?parent=0&folder=true
// {parent: 0, folder: "true"}
window.getUrlParams = function() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

$(document).ready(function() {
    // активный пункт меню
    var i_am_here = window.location.pathname.split('/')[1];
    $('#_navigation li a').each(function() {
        var el = $(this);
        if (el.attr('href').indexOf(i_am_here) !== -1) {
            el.parent().addClass('active');
            return false;
        }
    })
    var i_am_here1 = window.location.pathname;
    $('#_footer_navigation li a').each(function() {
        console.log(i_am_here1);
        var el = $(this);
        if (el.attr('href')==i_am_here1) {
            el.parent().addClass('active');
            return false;
        }
    })

    // pickmeup
    var locale = {
        days:        ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort:   ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin:     ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months:      ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    }
    $.pickmeup.format = "d-m-Y";
    $.pickmeup.position = "top";
    $.pickmeup.view = "years";
    $.pickmeup.hide_on_select = true;
    $.pickmeup.locale = locale;



    // datatables
    window.dateFormat = "DD.MM.YYYY";
    $.fn.dataTable.moment(dateFormat);



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
        if (el.hasClass('tt_html'))
            opts.contentAsHTML = true;

        el.tooltipster(opts);
    });


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

    // Доп. валидаторы полей
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zа-я]+$/i.test(value);
    }, "Letters only please");

    $.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^[0-9-]+$/i.test(value);
    }, "Digits and hyphens only please");



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

    window.cnt = $('.content');

    //Форматирование даты-времени на стороне клиента
    window.formatDateTimeToDefault = function(dt){
        var formatted = moment(dt).format('DD.MM.YYYY hh:mm:ss');
        return formatted;
    };

    // переключение языков
    function loadLang() {
        if (window.langs) {
            var langMenu = templatizer.els.addLangs(window.langs);
            $('#languages').empty();
            $('#languages').append(langMenu);
            $('#langMenu > li > a').unbind().click(function(q){
                var code = $(q.target).data('code');
                $.post('/locale/langChange', {code: code})
                    .done(function(res) {
                        $.cookie('langs', '');
                        $.cookie('currentLang', code, { expires: 7, path: '/' });
                        location.reload();
                    })
                    .fail(function(err) {
                        console.error(err);
                        mp.alert('Error:', err);
                    })
                return false;
            });
        }
    }

    //текущие языки
    var savedLangs = $.cookie('langs');
    window.langs = savedLangs ? JSON.parse(savedLangs) : undefined;
    if (!window.langs) {
        $.post('/locale/formatted', {})
            .done(function(res) {
                //var responded = JSON.parse(res);
                var responded = jQuery.parseJSON(res);
                var langs = {};
                langs.list = responded;
                langs.active = _.find(responded, {select: true});
                window.langs = langs;
                $.cookie('currentLang', langs.active.code);
                $.cookie('langs', JSON.stringify(langs));
                loadLang();
            })
            .fail(function(err) {
                console.error(err);
                mp.alert('Error:', err.responseText);
            })
    }
    else {
        loadLang();
    }


    // инит пагинатора
    window.PaginationInit=function(){
        var $paging_el = $('#pagination');
        if ($paging_el) {
            if (!window._pagination) {
                window._pagination = {};
            }
            if (window._pagination.total) {
                $paging_el.bootstrapPaginator({
                    currentPage: window._pagination.current,
                    numberOfPages: 5,
                    totalPages: window._pagination.total,
                    pageUrl: function(type, page, current){
                        return updateQueryStringParameter(location.href, 'page', page);
                    }
                });
            }
        }
    }
    PaginationInit();


    // поиск
    function processLoc() {
        var source=location.pathname.split('/');
        if (source.length>1)
            source=source[1]; // /controller
        else source=source[0];
        window.location = '/search/section?source='+source+'&req=' + $('#req').val();
    }
    $('#searchRow .btn').click(processLoc);
    $('#searchRow input').unbind().keydown(function(e) {
        if (e.keyCode == 13) { // the enter key code
            processLoc();
            return false;
        }
    });


    if (window.userIsNotActivated) {
        if (!$.cookie('userIsNotActivated_shown')) {
            mp.confirm(__('User_is_not_activated_msg'), function() {
                $.cookie('userIsNotActivated_shown', true, {expires: 1, path: '/'});
            })
        }
    }

});
