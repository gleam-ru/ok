module.exports = function(grunt) {
    // https://github.com/taptapship/wiredep#configuration
    grunt.config.set('wiredep', {
        task: {
            ignorePath: "../../..",
            exclude: [
                'highcharts',
                'bootstrap-treeview.*',
                'bootstrap-tagsinput.*',
                'alloy-editor-all-min.js',
                'alloy-editor-ocean-min.css',
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
