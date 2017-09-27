(function () {
    'use strict';

    angular
        .module('auth-services')
        .service('AuthService', AuthService);

    AuthService.$inject = [
        'lock',
        'angularAuth0',
        '$rootScope',
        'authManager',
        '$location',
        '$timeout',
        'jwtHelper'
    ];

    function AuthService(lock, angularAuth0, $rootScope, authManager, $location, jwtHelper, $timeout) {

        $rootScope.isAuthenticated = false;

        return {
            login: login,
            handleAuthentication: handleAuthentication,
            logout: logout,
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            unauthenticate: unauthenticate,
            registerAuthenticationListener: registerAuthenticationListener,
            checkAuthOnRefresh: checkAuthOnRefresh
        };

        function authenticate() {
            $rootScope.isAuthenticated = true;
        }

        function unauthenticate() {
            $rootScope.isAuthenticated = false;
        }

        function login() {
            angularAuth0.authorize().then(handleAuthentication);
        }

        function handleAuthentication() {
            angularAuth0.parseHash(function (err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult);
                    console.log(authResult);
                    $location.url('#!/home');
                } else if (err) {
                    $timeout(function() {
                        $location.url('#!/error');
                    });
                    console.log(err);
                }
            })
        }

        function setSession(authResult) {
            // Set the time that the access token will expire at
            var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
        }

        function isAuthenticated() {
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        function logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            authManager.unauthenticate();
        }

        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {
                var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                authManager.authenticate();
            });

            lock.on('authorization_error', function (err) {
                console.log(err);
            });
        }

        function checkAuthOnRefresh() {
            var token = localStorage.getItem('id_token');
            if (token) {
                authenticate();
                // if (!jwtHelper.isTokenExpired(token)) {
                //     if (!$rootScope.isAuthenticated) {
                //         angularAuth0.authorize();
                //     }
                // }
            }
        }
    }
})();
