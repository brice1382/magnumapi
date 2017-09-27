(function () {
    'use strict';

    angular
        .module('user-service')
        .service('UserSvc', UserSvc);

    UserSvc.$inject = ['$resource'];

    function UserSvc($resource) {
        return $resource('data/users.json', {}, {
            query: {
                method: 'GET',
                params: 'user_name',
                isArray: true
            }
        });
    }
})();
