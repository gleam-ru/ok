// https://github.com/HenrikJoreteg/templatizer
var templatizer = require('templatizer');

var src = process.cwd() + '/views/_client/*.jade';
var dst = process.cwd() + '/.tmp/public/jade_templates.js';

module.exports = function(grunt) {

    grunt.registerTask('jade2js', 'Compiles src jade to dst js', function() {
        templatizer(src, dst, {
            // namespace: 'Jade',
            dontRemoveMixins: true,
            inlineJadeRuntime: true,
        });
    });

};
