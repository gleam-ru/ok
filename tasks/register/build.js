module.exports = function (grunt) {
    grunt.registerTask('build', [
        'copy:dev',     // assets + bower
        'wiredep',      // bower into head
        'jade2js',      // create jade client templates
        'copy:head',    // особенности минификатора
        'sync:assets',  // синхронизирую исходники
    ]);
};
