window.initAlloy = function(config) {
    config = _.extend({
        storeAs        : 'post',
        savingInterval : 3000,
        // callbacks
        afterSave      : function() {},
        afterRestore   : function() {},
        onSmthChange   : function() {},
    }, config)
    return new Promise(function(ok, neok) {
        var me = {};
        me.config       = config;
        me.modified     = false;
        me.name         = $('#name');
        me.tags         = initTags();
        me.editor       = initEditor();
        me.nativeEditor = me.editor.get('nativeEditor');

        me.save_ls = function() {
            var snapshot = me.nativeEditor.getData();
            var data = {
                snapshot : snapshot,
                title    : me.name.val(),
                tags     : me.tags.tagsinput('items'),
            };
            if (me.config.storeAs) {
                localStorage.setItem(me.config.storeAs, JSON.stringify(data));
            }
            me.modified = false;
            me.config.afterSave(data);
            return data;
        }

        me.restore_ls = function() {
            var data = JSON.parse(localStorage.getItem(me.config.storeAs) || '{}');
            me.name.val(data.title || '');
            _.each(data.tags, function(tag) {
                me.tags.tagsinput('add', tag);
            })
            me.nativeEditor.setData(data.snapshot);
            me.modified = false;
            // not working :(
            // nativeEditor.loadSnapshot(snapshot);
            me.config.afterRestore(data);
        }

        me.clear_ls = function() {
            localStorage.setItem(me.config.storeAs, '{}');
        }



        // events
        //
        me.nativeEditor.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        });
        me.tags.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        })
        me.name.on('change', function() {
            me.modified = true;
            me.config.onSmthChange(this);
        })



        // install
        //
        if (me.config.storeAs) {
            me.restore_ls();

            setInterval(function() {
                if (me.modified) {
                    me.save_ls();
                }
            }, me.config.savingInterval);
        }

        return ok(me);
    })
}


$('#save').on('click', function() {
    cnt.mask();
    var snapshot = nativeEditor.getData();
    var data = {
        id: $('#id').val(),
        snapshot: snapshot,
        title: $('#name').val(),
        tags: $tags.tagsinput('items'),
    };
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



function initTags() {
    var $tags = $('#tags')
    $tags.tagsinput({
        confirmKeys: [9, 13, 44],
        trimValue: true,
    })

    return $tags;
}


function initEditor() {
    var tb;



    // link
    tb = AlloyEditor.Selections[0];



    // image
    tb = AlloyEditor.Selections[1];
    var filters = [{
        name: 'X-PRO 2',
        filter: 'contrast(1.3) brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-20deg)'
    }, {
        name: 'Willow',
        filter: 'saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02)'
    }, {
        name: 'Valencia',
        filter: 'sepia(0.15) saturate(1.5) contrast(0.9)'
    }, {
        name: 'Nashville',
        filter: 'sepia(0.4) saturate(1.5) contrast(0.9) brightness(1.1) hue-rotate(-15deg)'
    }, {
        name: 'Kelvin',
        filter: 'sepia(0.4) saturate(2.4) brightness(1.3) contrast(1)'
    }, {
        name: 'Inkwell',
        filter: 'grayscale(1) brightness(1.2) contrast(1.05)'
    }, {
        name: 'Earlybird',
        filter: 'sepia(0.4) saturate(1.6) contrast(1.1) brightness(0.9) hue-rotate(-10deg)'
    }, {
        name: 'Brannan',
        filter: 'sepia(0.5) contrast(1.4)'
    }, {
        name: '1977',
        filter: 'sepia(0.5) hue-rotate(-30deg) saturate(1.2) contrast(0.8)'
    }];

    var imageFilters = filters.map(function(filterDefinition) {
        return {
            name: filterDefinition.name,
            style: {
                element: 'img',
                styles: {
                    filter: filterDefinition.filter,
                    '-webkit-filter': filterDefinition.filter
                },
                type: CKEDITOR.STYLE_OBJECT
            }
        }
    });

    tb.buttons.unshift({
        name: 'styles',
        cfg: {
            styles: imageFilters
        }
    });



    // text
    tb = AlloyEditor.Selections[2];
    tb.buttons = [
        'h1',
        'h2',
        'bold',
        'italic',
        'underline',
        'strike',
        'ul',
        'link',
        'removeFormat',
    ];



    // table
    tb = AlloyEditor.Selections[3];
    var tableClasses = [{
        name: 'Normal Table',
        cssClass: 'table'
    }, {
        name: 'Striped Rows',
        cssClass: 'table table-striped'
    }, {
        name: 'Bordered Table',
        cssClass: 'table table-bordered'
    }, {
        name: 'Hover Rows',
        cssClass: 'table table-hover'
    }, {
        name: 'Condensed Table',
        cssClass: 'table table-condensed'
    }];

    var tableStyles = tableClasses.map(function(styleDefinition) {
        return {
            name: styleDefinition.name,
            style: {
                element: 'table',
                attributes: {
                    'class': styleDefinition.cssClass
                }
            }
        }
    });

    tb.buttons.unshift({
        name: 'styles',
        cfg: {
            styles: tableStyles
        }
    });



    return AlloyEditor.editable('zone', {
        toolbars: {
            add: {
                buttons: ['hline', 'image', 'table'],
                tabIndex: 2,
            },
            styles: {
                selections: AlloyEditor.Selections,
                tabIndex: 1,
            },
        },
    });
}
