(function() {
    "use strict";

    angular.module("diplomApp.state", [])
        .factory('StateService', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {

            var service = {};

            service.interpretState = function (term, subterms, isForcedChange) {
                if (!term) {
                    $state.go('select.overview');
                } else {
                    $state.go('select.list', { term: term });
                }
            };

            service.print = function () {
                return $http.post('/api/print');
            };
            return service;

        }]);
}());