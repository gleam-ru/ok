$(document).ready(function() {
    var $tags = $('#tags')
    var $name = $('#name')
    $tags.tagsinput({
        confirmKeys: [9, 13, 44],
        trimValue: true,
    })


    setupToolbar_link();
    setupToolbar_image();
    setupToolbar_text();
    setupToolbar_table();


    window.editor = AlloyEditor.editable('zone', {
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

    var nativeEditor = editor.get('nativeEditor');

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



});



function setupToolbar_link() {
    var tb = AlloyEditor.Selections[0];
}

function setupToolbar_image() {
    var tb = AlloyEditor.Selections[1];

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
}


function setupToolbar_text() {
    var tb = AlloyEditor.Selections[2];
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
}

function setupToolbar_table() {
    var tb = AlloyEditor.Selections[3];

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
}
