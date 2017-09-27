(function () {
    'use strict';

    angular
        .module('navbar')
        .directive('navbar', navbar);

    function navbar() {
        return {
            templateUrl: 'views/layouts/navbar/navbar.template.html',
            controller: 'NavbarCtrl',
            controllerAs: 'nc'
        }
    }
})();