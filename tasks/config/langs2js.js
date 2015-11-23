/**
 * Создаю клиентскую имплементацию __()
 * (локализация)
 */

var fs = require('fs-extra');

var src = process.cwd() + '/config/locales';
var dst = process.cwd() + '/.tmp/public/js/langs';

function createFile(fileName) {
    // var json = ''
    var json = fs.readFileSync(fileName);
    /*jshint multistr: true */
    var result = '\n\
        window.__ = function(keyStr) {\n\
            var fileName = "'+fileName+'";\
            if (!keyStr || keyStr.length === 0) {\n\
                console.warn("keyStr was not specified");\n\
            }\n\
            var langJson = '+json+'\n\
            var result = langJson[keyStr] || "";\n\
            if (!result || result.length === 0) {\n\
                console.warn("key value is empty", fileName, keyStr, result);\n\
            }\n\
            return result;\n\
        }\n\
    ';
    console.log('js/lang created:', fileName);
    return result;
}

module.exports = function(grunt) {

    grunt.registerTask('langs2js', 'Compiles src jade to dst js', function() {
        var langFiles = fs.readdirSync(src);
        if (!fs.ensureDirSync(dst)) {
            fs.mkdirsSync(dst);
        }
        langFiles.forEach(function(fileName) {
            var createdFileText = createFile(src+'/'+fileName);
            fs.writeFileSync(dst+'/'+fileName.replace('.json', '')+'.js', createdFileText);
        });
    });

};
