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

                'lstorage',
            ],
            watch: {
                language: function() {
                    console.log('language mod');
                    this.save_ls();
                },
                blog: function() {
                    console.log('blog mod');
                    this.save_ls();
                },
                post: function() {
                    console.log('post mod');
                    this.save_ls();
                },
                title: function() {
                    console.log('title mod');
                    this.save_ls();
                },
                tags: function() {
                    console.log('tags mod');
                    this.save_ls();
                },
                text: function() {
                    console.log('text mod');
                    this.save_ls();
                },
            },
            methods: {
                save: function() {
                    this.$emit('save');
                },
                clear_ls: function() {
                    var vm = this;
                    if (vm.lstorage) {
                        localStorage.setItem(vm.lstorage, '{}');
                    }
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
                    if (vm.lstorage) {
                        console.log('saving_ls', vm.isModified, state);
                        localStorage.setItem(vm.lstorage, JSON.stringify(state));
                    }
                    return state;
                },
                resotre_ls: function() {
                    var vm = this;
                    var state = JSON.parse(localStorage.getItem(vm.lstorage) || '{}');
                    if (state.language) {
                        vm.language = state.language;
                    }
                    if (state.blog || state.post) {
                        vm.blog = state.blog;
                        vm.post = state.post;
                    }
                    if (state.title) {
                        vm.title = state.title;
                    }
                    if (state.tags && state.tags.length) {
                        vm.tags = state.tags;
                    }
                    if (state.text) {
                        vm.text = state.text;
                    }
                    console.log('restored', state);
                    return state;
                },
            },
            ready: function() {
                var vm = this;
                window.pe = vm;

                vm.resotre_ls();
            }
        }
    })
    .then(resolve)
    ;
}
