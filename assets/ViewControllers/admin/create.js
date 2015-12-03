$(document).ready(function() {
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
        _uploadImage: function _uploadImage(file, editor) {
            if (!file.type.match(/image.*/)) {
                alert('File Type must be an image');
                return false;
            }
            debugger
            var reader = new FileReader();
            reader.onload = (function(f) {
                return function(e) {
                    // var html = '<figure>';
                    // html += '<img src="' + e.target.result + '" alt="' + f.name + '">';
                    // html += '<figcaption>';
                    // html += '<small>' + f.name + '</small>';
                    // html += '</figcaption>';
                    // html += '</figure>';
                    // var el = CKEDITOR.dom.element.createFromHtml(html);
                    html = '<p><img src="' + e.target.result + '" alt="' + f.name + '"><span class="progress"></span></p>';
                    var el = CKEDITOR.dom.element.createFromHtml(html);
                    editor.insertElement(el);
                    editor.fire('actionPerformed', this);
                    var imageData = {
                        el: el,
                        file: file
                    };
                    editor.fire('imageAdd', imageData);
                };
            })(file);
            reader.readAsDataURL(file);
            editor.on('imageAdd', function(e) {
                // console.log(e);
                console.log(e.data.el);
                // $(e.data.el).html('sadasd');
                // $(e.data.el.$.innerHTML).attr('data-test', 'test')
                var method = 'POST';
                var url = '/cms/post/upload';
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                var token = $('meta[name="csrf-token"]').attr('content');
                fd.append('_token', token);
                fd.append('upload', file);
                xhr.open(method, url, true);
                xhr.onreadystatechange = function(response) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // Every thing ok, file uploaded
                        // console.log(xhr.responseText); // handle response.
                        var response = jQuery.parseJSON(xhr.responseText);
                        console.log(response.success);
                    }
                };
                xhr.onload = function(response) {
                    var response = jQuery.parseJSON(xhr.responseText);
                    console.log(response.img_url);
                }
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        // console.log((evt.loaded / evt.total) * 100 + "%");
                    }
                    else {
                        // No data to calculate on
                    }
                }, false);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Cache-Control', 'no-cache');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(fd);
            });
            editor.on('actionPerformed', function(e) {
                // console.log(e);
                // console.log(e.data.result);
            });
        }
    });

    var nativeEditor = editor.get('nativeEditor');
    var modified = false;

    restore_ls();

    nativeEditor.on('change', function(event) {
        modified = true;
    });

    setInterval(function() {
        if (modified) {
            save_ls();
        }
    }, 3000);

    function save_ls() {
        var snapshot = nativeEditor.getData();
        var data = {
            snapshot: snapshot,
            title: 'qwe',
            tags: ['tag', 'moar tag'],
        };
        localStorage.setItem('post', JSON.stringify(data));
        modified = false;
        return data;
    }
    function restore_ls() {
        var data = JSON.parse(localStorage.getItem('post') || '{}');
        $('#name').val(data.title || '');
        $('#tags').val(data.tags || '');
        nativeEditor.setData(data.snapshot);
        // not working :(
        // nativeEditor.loadSnapshot(snapshot);
        modified = false;
    }



    $('#save').on('click', function() {
        var data = save_ls();
        $.post('/create', {
            msg: data,
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
