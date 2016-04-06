/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        var data = {
            pageTitle: 'Admin',
        };
        return Q()
            .then(function() {
                return QA.find();
            })
            .then(function(qa) {
                data.qas = qa.length;
                return Request.find({type: 'pay_request'});
            })
            .then(function(pay_requests) {
                data.pay_requests = pay_requests.length;
                return Contract.find();
            })
            .then(function(contracts) {
                data.contracts = contracts.length;
            })
            .then(function() {
                return res.render('admin', data);
            })
            ;
    },

    qas: function (req, res) {
        var data = {
            pageTitle: 'Admin - QAs',
            title: 'Admin - QAs',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'QAs',   href: '/admin/qa'},
            ],
        };
        return Q()
            .then(function() {
                return QA.find();
            })
            .then(function(qas) {
                data.qas = _(qas)
                    .sortBy('createdAt')
                    .reverse()
                    .value()
                    ;
            })
            .then(function() {
                return res.render('admin/qas', data);
            })
            ;
    },

    pay_requests: function (req, res) {
        var data = {
            pageTitle: 'Admin - Pay requests',
            title: 'Admin - Pay requests',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Pay requests', href: '/admin/pay_requests'},
            ],
        };
        return Q()
            .then(function() {
                return Request.find({type: 'pay_request'});
            })
            .then(function(requests) {
                data.pay_requests = _(requests)
                    .sortBy('createdAt')
                    .reverse()
                    .value()
                    ;
            })
            .then(function() {
                return res.render('admin/pay_requests', data);
            })
            ;
    },


    user: function(req, res) {
        var id = parseInt(req.param('id'));
        if (!id) {
            return res.notFound();
        }
        var data = {
            pageTitle: 'Edit user',
            title: 'Edit user',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Users', href: '/admin/users'},
                {name: 'Edit',  href: '/admin/users/edit/'+id},
            ],

            profile: _.extend({}, req.user, {
                id: 1,
                name: 'No-Name',
                surname: 'No-Surname',
                email: 'No-Email',
                photo: 'team-member11.jpg',
            }),
        };
        return Q()
            .then(function() {
                return User
                    .findOne({id: id})
                    .populateAll()
                    .then(function(user) {
                        _.extend(data.profile, user);
                    })
                    ;
            })
            .then(function() {
                return res.render('profile/edit', data);
            })
            ;
    },


    users: function(req, res) {
        var data = {
            pageTitle: 'All users',
            title: 'All users',
            bc: [
                {name: 'Home',  href: '/'},
                {name: 'Admin', href: '/admin'},
                {name: 'Users', href: '/admin/users'},
            ],
        };

        Q()
            .then(function() {
                return Role
                    .find()
                    .then(function(roles) {
                        _.remove(roles, {name: 'ghost'});
                        data.roles = roles;
                    })
                    ;
            })
            .then(function() {
                return User
                    .find()
                    .populateAll()
                    .then(function(users) {
                        data.users = users;
                    })
                    ;
            })
            .then(function() {
                return res.render('admin/users', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    },


    contracts: function(req, res) {
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
                return Contract.find();
            })
            .then(function(contracts) {
                data.contracts = contracts;
            })
            .then(function() {
                return res.render('admin/contracts', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    },

    single_contract: function(req, res) {
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
            })
            .then(function() {
                return res.render('admin/contract', data);
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;

    }

};
