(function () {
    'use strict';

    angular
        .module('error')
        .controller('ErrorCtrl', ErrorCtrl);

    ErrorCtrl.$inject = [];

    function ErrorCtrl() {
        var vm = this;

        vm.title = 'SHIT';
    }
})();
