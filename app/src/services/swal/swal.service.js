(function () {
    'use strict';

    angular
        .module('swal-service')
        .service('SwalSvc', SwalSvc);

    SwalSvc.$inject = [];

    function SwalSvc() {
        return {
            successful: successful,
            saveError: saveError
        };

        function successful() {
            swal({
                title: 'Post Successful',
                type: 'success',
                text: 'Your reference was saved successfully.',
                showConfirmButton: true,
                closeOnConfirm: true,
                showCancelButton: false
            });
        }

        function saveError() {
            swal({
                title: 'Oops',
                type: 'error',
                text: 'Something went wrong!!!',
                showConfirmButton: true,
                closeOnConfirm: true,
                showCancelButton: false
            });
        }
    }
})();
