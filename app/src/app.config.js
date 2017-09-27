(function () {
    'use strict';

    angular
        .module('magpi')
        .config(config);

    config.$inject = [
        '$locationProvider',
        'lockProvider',
        '$routeProvider',
        'angularAuth0Provider',
        'jwtOptionsProvider'
    ];

    function config(
        $locationProvider,
        lockProvider,
        $routeProvider,
        angularAuth0Provider,
        jwtOptionsProvider
    ) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/home', {
            templateUrl: 'views/home/home.template.html',
            controller: 'HomeCtrl',
            controllerAs: 'hc'
        }).when('/login', {
            templateUrl: 'views/login/login.template.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
        }).when('/knowledge-base', {
            templateUrl: 'views/knowledge-base/knowledge-base.template.html',
            controller: 'KnowledgeBaseCtrl',
            controllerAs: 'kc'
        }).when('/callback', {
            templateUrl: 'services/auth/callback/callback.template.html',
            controller: 'CallbackCtrl',
            controllerAs: 'cc'
        }).when('/error', {
            templateUrl: 'views/error/error.template.html',
            controller: 'ErrorCtrl',
            controllerAs: 'ec'
        }).otherwise({redirectTo: '/home'});

        lockProvider.init({
            clientID: AUTH0_CLIENT_ID.toString(),
            domain: AUTH0_DOMAIN,
            options: {
                _idTokenVerification: false
            }
        });

        angularAuth0Provider.init({
            clientID: AUTH0_CLIENT_ID,
            domain: AUTH0_DOMAIN,
            responseType: 'token id_token',
            audience: 'https://brice721.auth0.com/userinfo',
            redirectUri: AUTH0_CALLBACK_URL,
            scope: 'openid'
        });

        jwtOptionsProvider.config({
            tokenGetter: ['options', function(options) {
                if(options && options.url.substr(options.url.length - 5) == '.html'){
                    return null;
                }
                return localStorage.getItem('id_token');
            }],

            whiteListedDomains: ['localhost'],
            unauthenticatedRedirectPath: '/login'
        });
    }
})();
