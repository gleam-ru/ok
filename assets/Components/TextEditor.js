module.exports = function(resolve) {
    window.ALLOYEDITOR_BASEPATH = '/bower_components/alloyeditor/dist/alloy-editor/';
    window.CKEDITOR_BASEPATH    = '/bower_components/alloyeditor/dist/alloy-editor/'
    System.importAll({
        _raw: [
            '/bower_components/alloyeditor/dist/alloy-editor/assets/alloy-editor-atlas-min.css',
            '/bower_components/alloyeditor/dist/alloy-editor/alloy-editor-all-min.js',
        ]
    })
    .then(function() {
        return {
            template: [
                '<div v-el:editor class="vi-textEditor">',
                    '{{{text}}}',
                '</div>',
            ].join(''),
            props: ['text'],
            data: function() {
                return {
                };
            },
            watch: {
            },
            methods: {
                get: function() {
                    return this._editor.getData();
                },
            },
            ready: function() {
                var vm = this;
                window.te = this;
                var tb;
                // links
                tb = AlloyEditor.Selections[0];

                // images
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
                var editor = AlloyEditor.editable(vm.$els.editor, {
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
                vm._editor = editor.get('nativeEditor');


                vm._editor.on('dataReady', function() {
                    // чтобы скролл не появлялсо он лоад
                    editor._mainUI._setUIHidden(document.activeElement)
                });
                vm._editor.on('change', Vue.filter('debounce')(function() {
                    vm.text = vm.get();
                }), 100);

            }
        }
    })
    .then(resolve)
    ;
}

