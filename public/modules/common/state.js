(function() {
    "use strict";

    angular.module("diplomApp.state", [])
        .factory('StateService', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {

            var service = {};

            service.interpretState = function (term, subterms, isForcedChange) {
                if (!term) {
                    if(!$state.includes('select.overview') && !$state.includes('select.instructions')) {
                        $state.go('select.instructions');
                    }
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