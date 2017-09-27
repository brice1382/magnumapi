(function () {
    'use strict';

    angular
        .module('knowledge-base')
        .controller('KnowledgeBaseCtrl', KnowledgeBaseCtrl);

    KnowledgeBaseCtrl.$inject = ['KnowledgeBaseSvc', 'SwalSvc', '$timeout'];

    function KnowledgeBaseCtrl(KnowledgeBaseSvc, SwalSvc, $timeout) {
        var vm = this;

        vm.categories = [
            { key: 1, value: 'AngularJS' },
            { key: 2, value: 'Angular 4' },
            { key: 3, value: 'HTML' },
            { key: 4, value: 'CSS' },
            { key: 5, value: 'C-Sharp' },
            { key: 6, value: 'Java' }
        ];

        vm.addReference = function (reference) {
            reference = {
                Title: vm.title,
                Description: vm.description,
                Category: vm.option.value,
                Link: vm.refLink
            };
            console.log(reference);
            localStorage.setItem('refs', reference);
            // location.reload();
            KnowledgeBaseSvc.postRef(reference).then(function (response) {
                if (response.success) {
                    SwalSvc.successful();
                } else {
                    SwalSvc.saveError();
                }
            })
        };

        vm.res = [];
        vm.getSome = function () {
            KnowledgeBaseSvc.getAllRef().then(function (response) {
                vm.res = response;
                console.log(JSON.stringify(response));
            })
        }

    }
})();
