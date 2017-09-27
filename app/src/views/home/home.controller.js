(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$http', 'FileSaver', 'Blob'];

    function HomeCtrl($scope, $http, FileSaver, Blob) {
        var vm = this;

        vm.title = 'Home';

        var opts = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
            weekday: 'long'
        };
        var stamp = new Date().getTime();

        vm.val = {
            text: document.getElementById('searches').value
        };

        vm.download = function(text) {
            text = document.getElementById('searches').value;
            var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(data, 'text-' + stamp + '.txt');
        };

        var getUsers = function () {
            $http.get('./data/users.json').then(function (response) {
                $scope.users = response.data;
                $scope.images = response.data.images;
                console.log(response.data);
            })
        };

        $scope.$on('$viewContentLoaded', function () {
            getUsers();
        })
    }
})();

