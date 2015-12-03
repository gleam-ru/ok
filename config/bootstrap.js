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
    // console.log(sanitize('<p>asd'))
    // >> <p>asd</p>
    global.sanitize = function(text) {
        return require("sanitize-html")(text, {
            // разрешить все теги и все атрибуты
            allowedTags: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'p',
                'ul',
                'ol',
                'li',
                'hr',
                'table',
                'th',
                'tr',
                'td',
                'span',
                'div',
                'i',
                'b',
                's',
                'u',
                'img',
            ],
            allowedAttributes: false,
        })
    }

    // проверить по YYYY-MM-DD перед заменой!!! некоторые сервисы требуют
    // повторной инициализации ddf
    global.ddf = 'YYYY-MM-DD'; // Default Date Format

    global.appRoot = __dirname+'/..';


    global.canSee = function(menu, user) {
        if (!menu.canSee) {
            return true;
        }
        var roles = user.roles && _.map(user.roles, 'name') || ['ghost']; // гость
        return _.intersection(menu.canSee, roles).length !== 0;
    }

    // у пользователя есть роль...
    global.hasRole = function(user, role) {
        return _.findIndex(user.roles, {name: role}) !== -1;
    }

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
