(function () {
    'use strict';

    angular
        .module('knowledge-base')
        .service('KnowledgeBaseSvc', KnowledgeBaseSvc);

    KnowledgeBaseSvc.$inject = ['$http'];

    function KnowledgeBaseSvc($http) {
        var url = 'http://magnumapi.spire-web.com/api/v1/mgbt';
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return {
            postRef: postRef,
            getAllRef: getAllRef
        };

        function postRef(reference) {
            return $http.post(url, reference, config).then(successHandler, errorHandler('There was an error posting your link'));
        }

        function getAllRef() {
            return $http.get(url).then(successHandler, errorHandler('Could not retrieve references'));
        }

        function successHandler(res) {
            return res.data;
        }

        function errorHandler(error) {
            return function () {
                return { success: false, message: error };
            }
        }
    }
})();
