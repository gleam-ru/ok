module.exports.bootstrap = function(cb) {

    // MODULES
    global.moment   = require('moment');
    global.fs       = require('fs-extra');
    global._        = require('lodash');
    global.Q        = require('q');
    global.Q.series = function(list) {
        var done = Q();
        var results = [];
        _.each(list, function(fn) {
            done = done.then(function() {
                return fn();
            })
            results.push(done)
        })
        return Q.all(results);
    }

    // проверить по YYYY-MM-DD перед заменой!!! некоторые сервисы требуют
    // повторной инициализации ddf
    global.ddf = 'YYYY-MM-DD'; // Default Date Format

    global.appRoot = __dirname+'/..';

    // TODO: сделать покрасиввее
    if (sails.config.dev) {
        return Q()
            .then(filler.process())
            .then(cache.init())
            .then(cron.init())
            .nodeify(cb);
    }
    else {
        cb();
        return;
    }

};
