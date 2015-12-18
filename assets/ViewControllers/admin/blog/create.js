$(document).ready(function() {

    System.importAll({
        pe: '/Components/PostEditor.js',
    })
    .then(function(imported) {
        var defaults = _.extend({
            id       : undefined,
            blog     : 1,
            post     : undefined,
            language : 1,
            tags     : '',
        }, getUrlParams());
        window.vm = new Vue({
            el: '#vue',
            components: {
                'post-editor': imported.pe,
            },
            template: [
                '<post-editor',
                    'v-el="editor"',
                    ':id="id"',
                    ':languages="languages"',
                    ':language.sync="language"',
                    ':parents="parents"',
                    ':blog.sync="blog"',
                    ':post.sync="post"',
                    ':title.sync="title"',
                    ':tags.sync="tags"',
                    ':text.sync="text"',

                    ':lstorage="lstorage"',

                    '@save="save"',
                    '>',
                '</post-editor>',
            ].join(' '),
            data: {
                languages : globalVars.languages,
                language  : defaults.language,

                parents   : globalVars.tree,
                blog      : defaults.blog || (globalVars.post.blog && globalVars.post.blog.id),
                post      : defaults.post || (globalVars.post.parent && globalVars.post.parent.id),

                tags      : (defaults.tags ? defaults.tags.split(',') : []).concat(_.map(globalVars.post.tags, 'name')),

                title     : globalVars.post.title,

                text      : globalVars.post.text,

                lstorage  : 'post_creating',
            },
            methods: {
                save: function() {
                    var vm = this;
                    cnt.mask();
                    var data = {
                        language  : vm.language,
                        blog      : vm.blog,
                        post      : vm.post,
                        tags      : vm.tags,
                        title     : vm.title,
                        text      : vm.text,
                    };
                    $.post('/api/update_post', {
                        msg: data,
                    })
                    .done(function(data) {
                        vm.$children[0].clear_ls();
                        window.location.href = '/blog/get/'+data.id;
                    })
                    .fail(function(err) {
                        mp.alert('something went wrong...');
                        console.error(err);
                    })
                    .always(function() {
                        cnt.unmask();
                    })
                },
            },
            ready: function() {
                var vm = this;
            }
        })
    })
    .catch(function(err) {
        console.log(err);
        debugger;
    })

});
