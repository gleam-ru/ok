/**
 * QAController
 *
 * @description :: Server-side logic for managing QAS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        var data = {
            pageTitle: 'QA',
            title: 'QA',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'QA', href: '/qa'},
            ],
        }
        return Q()
            .then(function() {
                return res.render('qa', data)
            })
    },

    posted: function(req, res) {
        var name = req.param('name');
        var email = req.param('email');
        var text = req.param('text');


        return Q()
            .then(function() {
                if (!name || !email || !text) {
                    throw new Error('Please complete all fields correctly!');
                }
            })
            .then(function() {
                return QA.create({
                    author: name,
                    email: email,
                    text: text,
                });
            })
            .then(function() {
                flashes.info(req, 'Your message has been sent');
                return res.redirect('/qa');
            })
            .catch(function(err) {
                flashes.error(req, err);
                return res.redirect(req.get('referer'));
            })
    }

};

