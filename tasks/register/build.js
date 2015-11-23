module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:uploads',
        'copy:dev',     // assets + bower
        'wiredep',      // bower into head
        'langs2js',     // create client langs
        'jade2js',      // create jade client templates
        'copy:head',    // особенности минификатора
        'sync:assets',  // синхронизирую исходники
        'less:dev',
    ]);
};
