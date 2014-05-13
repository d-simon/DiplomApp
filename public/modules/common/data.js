(function() {
    "use strict";

    angular.module("diplomApp.data", [])
        .factory('DataService', ['$http', function ($http) {

            var service = {};

            var Data = {
                terms: [
                    'Leder',
                    'Zitrone',
                    'Teer',
                    'Schweiss',
                    'Blume',
                    'Metall',
                    'See'
                ]
            };

            service.getState = function () {
                return $http.get('/api/state');
            };
            service.updateState = function (state) {
                return $http.put('/api/state', state);
            };

            service.getTerms = function () {
                return Data.terms;
            };

            return service;

        }]);
}());