(function () {
    'use strict';

    angular
        .module('navbar')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['AuthService', '$scope'];

    function NavbarCtrl(AuthService, $scope) {
        var vm = this;

        $scope.AuthService = AuthService;
    }
})();
