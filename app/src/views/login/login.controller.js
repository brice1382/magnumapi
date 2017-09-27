(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['AuthService'];

    function LoginCtrl(AuthService) {
        var vm = this;

        vm.AuthService = AuthService;
    }
})();
