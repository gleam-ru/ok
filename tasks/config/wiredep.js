module.exports = function(grunt) {
    // https://github.com/taptapship/wiredep#configuration
    grunt.config.set('wiredep', {
        task: {
            ignorePath: "../../..",
            exclude: [
                'alloy-editor-all-min.js',
                // 'vue.js',
            ],
            src: [
                'views/_layouts/parts/head.jade',
            ],
            fileTypes: {
                jade: {
                  replace: {
                    js: 'script(src="{{filePath}}")'
                  }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
};
//*/
