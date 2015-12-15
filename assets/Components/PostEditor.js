module.exports = function(resolve) {
    System.importAll({
        ti: '/Components/TagsInput.js',
        ps: '/Components/ParentSelector.js',
        te: '/Components/TextEditor.js',
    })
    .then(function(imported) {
        return {
            components: {
                'tags-input'       : imported.ti,
                'parent-selector'  : imported.ps,
                'text-editor'      : imported.te,
            },
            template: [
                '<div class="vi-postEditor">',
                    '<div class="row">',
                        '<select',
                            'class="languages col-md-1"',
                            'v-model="language"',
                            '>',
                            '<option',
                                'v-for="language in languages"',
                                'value={{language.id}}',
                                '>',
                                '{{language.name}}',
                            '</option>',
                        '</select>',
                        '<parent-selector',
                            'class="col-md-11"',
                            ':tree="parents"',
                            ':blog.sync="blog"',
                            ':post.sync="post"',
                            '>',
                        '</parent-selector>',
                    '</div>',

                    '<div class="row">',
                        '<input',
                            'v-model="title"',
                            'placeholder="Post title"',
                            '>',
                    '</div>',

                    '<div class="row">',
                        '<tags-input',
                            ':tags="tags"',
                            '>',
                        '</tags-input>',
                    '</div>',

                    '<div class="row">',
                        '<text-editor',
                            ':text.sync="text"',
                            '>',
                        '</text-editor>',
                    '</div>',

                    '<div class="row">',
                        '<a id="save" href="#">',
                            '<span',
                                'class="btn button-reveal button"',
                                '@click=save',
                                '>',
                                '<i class="fa fa-save"></i>',
                                '<span>Save</span>',
                            '</span>',
                        '</a>',
                    '</div>',
                '</div>',
            ].join(' '),
            props: [
                'languages', 'parents',
                    'language',
                    'blog',
                    'post',
                'title',
                'tags',
                'text',
            ],
            methods: {
                get: function() {
                },
            },
            ready: function() {
                var vm = this;
                window.pe = this;
            }
        }
    })
    .then(resolve)
    ;
}
