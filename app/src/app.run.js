(function () {
    'use strict';

    angular
        .module('magpi')
        .run(run);

    run.$inject = ['$rootScope', 'AuthService'];

    function run($rootScope, AuthService) {

        $rootScope.AuthService = AuthService;

        AuthService.registerAuthenticationListener();

        AuthService.checkAuthOnRefresh();

        // lock.interceptHash();

    }
})();
