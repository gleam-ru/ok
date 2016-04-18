/**
 * ContractController
 *
 * @description :: Server-side logic for managing Contracts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // страница с заполнением договора и подписью
    create: function(req, res) {
        var type = req.param('type');
        var referer = req.get('referer');
        var data = {
            pageTitle: 'Contract',
            title: 'Contract',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Profile', href: '/profile'},
                {name: 'Contract', href: '/profile/contract'},
            ],

            profile: _.extend({}, req.user),
            contract: {data: {}},
        };

        return Q()
            .then(function() {
                if (type === 'account_application') {
                    return res.render('contract/account_application_dynamic_print', data);
                }
                else if (type === 'credit_line') {
                    return res.render('contract/credit_line_dynamic_print', data);
                }
                else {
                    return res.notFound();
                }
            })
            .catch(function(err) {
                console.error(err.stack);
                flashes.error(req, err);
                return res.redirect(referer);
            })
            ;
    },

    // страница с сообщением об успехе
    success: function(req, res) {
        var type = req.param('type');
        var referer = req.get('referer');
        var data = {
            pageTitle: 'Contract',
            title: 'Contract',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Profile', href: '/profile'},
                {name: 'Contract', href: '/profile/contract'},
            ],
        };

        return Q()
            .then(function() {
                return res.render('contract/success', data);
            })
            .catch(function(err) {
                console.error(err.stack);
                flashes.error(req, err);
                return res.redirect(referer);
            })
            ;
    },

    // страница для печати
    printpage: function(req, res) {
        var id = parseInt(req.param('id'));

        var data = {
            pageTitle: 'Contract',
            title: 'Contract',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Contracts', href: '/admin/contracts'},
                {name: 'Contract', href: '/admin/contracts/get/'+id},
            ],
        };

        Q()
            .then(function() {
                return Contract.findOne({id: id});
            })
            .then(function(contract) {
                data.contract = contract;
                if (!contract) {
                    return res.notFound('no such contract');
                }

                var type = contract.type;
                if (type === 'account_application') {
                    return res.render('contract/account_application_static_print', data);
                }
                else if (type === 'credit_line') {
                    return res.render('contract/credit_line_static_print', data);
                }
                else {
                    return res.notFound('bad contract type:', type);
                }
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;

    },




    // API POST
    update: function(req, res) {
        var contract = req.param('msg');
        if (!contract) {
            return res.badRequest();
        }

        return Q()
            .then(function() {
                if (contract.id) {
                    return Contract.findOne({id: parseInt(contract.id)});
                }
                else {
                    return Contract.create({type: contract.type});
                }
            })
            .then(function(created) {
                delete contract.id;
                _.extend(created, contract);
                return created.save();
            })
            .then(function() {
                return res.ok();
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    },

    // total lists
    all: function(req, res) {
        var type = req.param('type');

        var data = {
            pageTitle: 'All contracts',
            title: 'All contracts',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Contracts', href: '/admin/contracts'},
            ],
        };

        Q()
            .then(function() {
                return Contract.find({type: type});
            })
            .then(function(contracts) {
                data.contracts = contracts;
            })
            .then(function() {
                return res.render('contract/table', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    },

    // in-site page
    single: function(req, res) {
        var id = parseInt(req.param('id'));


        var data = {
            pageTitle: 'Contract',
            title: 'Contract',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Contracts', href: '/admin/contracts'},
                {name: 'Contract', href: '/admin/contracts/get/'+id},
            ],
        };

        Q()
            .then(function() {
                return Contract.findOne({id: id});
            })
            .then(function(contract) {
                data.contract = contract;
                if (!contract) {
                    return res.notFound('no such contract');
                }

                var type = contract.type;
                if (type === 'account_application') {
                    return res.render('contract/account_application_static', data);
                }
                else if (type === 'credit_line') {
                    return res.render('contract/credit_line_static', data);
                }
                else {
                    return res.notFound('bad contract type:', type);
                }
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    }

};

