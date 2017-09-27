(function () {
    'use strict';

    angular
        .module('magpi', [
            'ngRoute',
            'ngResource',
            'auth0.lock',
            'angular-jwt',
            'auth0.auth0',
            'ngFileSaver',
            'services',
            'views'
        ]);


})();
