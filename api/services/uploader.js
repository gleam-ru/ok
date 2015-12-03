var Q             = require('Q');
var mkdirp        = require('mkdirp');
var mkdirp_q      = Q.denodeify(mkdirp);

var uploader      = {};
var uploadsDir    = '/assets/uploads/';
var uploadsForDev = '/.tmp/public/uploads/';



uploader.uploadBase64Image = function(str, path) {
    if (!path || !str) {
        return false;
    }
    var randomFilename = Math.random().toString(36).substring(7)+'.jpeg';
    var path_1 = appRoot+uploadsDir+path;
    var path_2 = appRoot+uploadsForDev+path;
    return Q.all([
            mkdirp_q(path_1),
            mkdirp_q(path_2),
        ])
        .then(function() {
            return saveBase64Image(str, path_1, randomFilename);
        })
        .then(function() {
            return saveBase64Image(str, path_2, randomFilename);
        })
        .then(function() {
            return randomFilename;
        })
        .catch(function(err) {
            console.error('uploadBase64Image err:', err, err.stack);
            return false;
        });
}





function saveBase64Image(string, path, name) {
    var randomFilename = name ? name : Math.random().toString(36).substring(7)+'.jpeg';
    var fullPath = path+randomFilename;
    return Q.resolve()
        .then(function() {
            var matches = string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            var result = {};

            if (matches.length !== 3) {
                throw new Error('Invalid input string');
            }

            result.type = matches[1];
            result.data = new Buffer(matches[2], 'base64');

            return result;
        })
        .then(function(result) {
            console.log('saving base64:', randomFilename);
            return Q.nbind(fs.writeFile, fs)(fullPath, result.data)
        })
}




module.exports = uploader;
