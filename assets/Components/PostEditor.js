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
                                '@click="save"',
                                '>',
                                '<i class="fa fa-save"></i>',
                                '<span>Save</span>',
                            '</span>',
                        '</a>',
                    '</div>',
                '</div>',
            ].join(' '),
            props: [
                'id',
                'languages', 'parents',
                    'language',
                    'blog',
                    'post',
                'title',
                'tags',
                'text',

                'storeAs',
            ],
            data: function() {
                return {
                    isModified: false,
                }
            },
            watch: {
                language: function() {
                    console.log('language mod');
                    this.isModified = true;
                },
                blog: function() {
                    console.log('blog mod');
                    this.isModified = true;
                },
                post: function() {
                    console.log('post mod');
                    this.isModified = true;
                },
                title: function() {
                    console.log('title mod');
                    this.isModified = true;
                },
                tags: function() {
                    console.log('tags mod');
                    this.isModified = true;
                },
                text: function() {
                    console.log('text mod');
                    this.isModified = true;
                },
            },
            methods: {
                save: function() {
                    this.$emit('save');
                },
                // save state to local storage
                save_ls: function() {
                    var vm = this;
                    var state = {
                        id       : vm.id,
                        language : vm.language,
                        blog     : vm.blog,
                        post     : vm.post,
                        title    : vm.title,
                        tags     : vm.tags,
                        text     : vm.text,
                    };
                    if (!vm.modified) {
                        return state;
                    }
                    console.log('saving_ls', state);
                },
            },
            ready: function() {
                var vm = this;
                window.pe = this;

                if (vm.storeAs) {
                    setInterval(vm.save_ls.bind(vm), 3000)
                }
            }
        }
    })
    .then(resolve)
    ;
}
