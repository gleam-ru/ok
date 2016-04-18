$(document).ready(function() {
    System.importAll({
        _raw: [
        ]
    })
    .then(function(imported) {
        Vue.config.debug = true;
        window.vm = new Vue({
            el: '#vue',
            components: {
            },
            data: {
                contract: globalVars.contract,
                signature: '',

                account: '',
                introduced: '',
                managed: '',
                fio: '',
                address: '',
                building: '',
                housing: '',
                apt: '',
                city: '',
                state: '',
                zipcode: '',
                country: '',
                mail_address: '',
                citizenship: '',
                nationality: '',
                dateofbirth: '',
                phone: '',
                lang: '',
                email: '',
                employment: '',
                currentemployer: '',
                typeofbusiness: '',
                occupation: '',
                yearsofwork: '',
                employeraddress: '',
                employerphone: '',
                fund1_holdername: '',
                fund1_bankname: '',
                fund1_bankaddress: '',
                fund1_iban: '',
                fund1_swift: '',
                fund2_holdername: '',
                fund2_bankname: '',
                fund2_bankaddress: '',
                fund2_iban: '',
                fund2_swift: '',
                income: '',
                assets: '',
                originofwealth: '',
                initialdeposit: '',
                businesshaslicense: '',
                businesslicense: '',
                expexchderivatives: '',
                expotcderivatives: '',
                expsecurities: '',
                explength: '',
                bymagazine: '',
                byonline: '',
                byfriend: '',
                byforum: '',
                bynewspaper: '',
                byseminar: '',
                bysearch: '',
                byother: '',
                acknowledgedby: '',
            },
            methods: {
                resetsignature: function() {
                    this.signaturePad.clear();
                },
                save: function() {
                    var vm = this;

                    var data = _.cloneDeep(vm.$data);
                    delete data.contract;
                    delete data.signature;

                    cnt.mask();
                    console.log('POST goes here');
                    $.post('/api/contract', {
                        msg: {
                            id: vm.contract.id,
                            type: 'account_application',
                            signature: vm.signature,

                            data: data,
                        }
                    })
                    .done(function(data) {
                        window.location.href = '/contract/success';
                    })
                    .fail(function(err) {
                        console.error(err);
                        mp.alert('smth went wrong...');
                    })
                    .always(function() {
                        cnt.unmask();
                    })
                    ;
                },
                reset: function() {
                    var vm = this;
                    vm.account = '';
                    vm.introduced = '';
                    vm.managed = '';
                    vm.fio = '';
                    vm.address = '';
                    vm.building = '';
                    vm.housing = '';
                    vm.apt = '';
                    vm.city = '';
                    vm.state = '';
                    vm.zipcode = '';
                    vm.country = '';
                    vm.mail_address = '';
                    vm.citizenship = '';
                    vm.nationality = '';
                    vm.dateofbirth = '';
                    vm.phone = '';
                    vm.lang = '';
                    vm.email = '';
                    vm.employment = '';
                    vm.currentemployer = '';
                    vm.typeofbusiness = '';
                    vm.occupation = '';
                    vm.yearsofwork = '';
                    vm.employeraddress = '';
                    vm.employerphone = '';
                    vm.fund1_holdername = '';
                    vm.fund1_bankname = '';
                    vm.fund1_bankaddress = '';
                    vm.fund1_iban = '';
                    vm.fund1_swift = '';
                    vm.fund2_holdername = '';
                    vm.fund2_bankname = '';
                    vm.fund2_bankaddress = '';
                    vm.fund2_iban = '';
                    vm.fund2_swift = '';
                    vm.income = '';
                    vm.assets = '';
                    vm.originofwealth = '';
                    vm.initialdeposit = '';
                    vm.businesshaslicense = '';
                    vm.businesslicense = '';
                    vm.expexchderivatives = '';
                    vm.expotcderivatives = '';
                    vm.expsecurities = '';
                    vm.explength = '';
                    vm.bymagazine = '';
                    vm.byonline = '';
                    vm.byfriend = '';
                    vm.byforum = '';
                    vm.bynewspaper = '';
                    vm.byseminar = '';
                    vm.bysearch = '';
                    vm.byother = '';
                    vm.acknowledgedby = '';
                },
            },
            ready: function() {
                var vm = this;
                if (globalVars.contract && globalVars.contract.id) {
                    // это просмотр созданного -> дефолтное заполение не нужно
                    return;
                }

                vm.reset();


                // https://github.com/szimek/signature_pad
                var canvas = vm.$els.signature;
                canvas.width = canvas.parentNode.offsetWidth - 30;
                canvas.height = canvas.parentNode.offsetHeight;
                vm.signaturePad = new SignaturePad(canvas, {
                    penColor: "#4343DA",
                    onBegin: function() {
                        vm.signature = null;
                        console.debug('reset');
                    },
                    onEnd: function() {
                        vm.signature = vm.signaturePad.toDataURL();
                        console.debug('set');
                    }
                });
            }
        })
        ;
        //*/
    })
    ;
});
