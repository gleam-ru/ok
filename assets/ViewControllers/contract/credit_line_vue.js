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
                contract        : globalVars.contract,

                sum             : '',
                name            : '',
                number          : '',
                currency        : '',
                transaction     : '',
                transactionDate : moment().format('YYYY-MM-DD'),
                signature: '',
            },
            methods: {
                resetsignature: function() {
                    this.signaturePad.clear();
                },
                save: function() {
                    var vm = this;
                    cnt.mask();
                    console.log('POST goes here');
                    $.post('/api/contract', {
                        msg: {
                            id: vm.contract.id,
                            type: 'credit_line',
                            signature: vm.signature,

                            data: {
                                sum: vm.sum,
                                name: vm.name,
                                number: vm.number,
                                currency: vm.currency,
                                transaction: vm.transaction,
                                transactionDate: vm.transactionDate,
                            },
                        }
                    })
                    .done(function(data) {
                        window.location.href = '/profile';
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
            },
            ready: function() {
                var vm = this;
                if (globalVars.contract && globalVars.contract.id) {
                    // это просмотр созданного -> дефолтное заполение не нужно
                    return;
                }

                vm.sum = '';
                vm.number = '';
                vm.name = (globalVars.profile.name || '')+' '+(globalVars.profile.surname || '');
                vm.currency = 'rub';
                vm.transaction = 'bank';
                vm.transactionDate = moment().format('YYYY-MM-DD');

                // https://github.com/szimek/signature_pad
                var canvas = vm.$els.signature;
                canvas.width = canvas.parentNode.offsetWidth - 30;
                vm.signaturePad = new SignaturePad(canvas, {
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
