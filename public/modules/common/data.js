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
                ],
                subTerms: [
                    { 'name': 'süss', 'image': 'media/suess.svg' },
                    { 'name': 'prickelnd', 'image': 'media/prickelnd.svg' },
                    { 'name': 'weich', 'image': 'media/weich.svg' },
                    { 'name': 'modrig', 'image': 'media/modrig.svg' },
                    { 'name': 'hart', 'image': 'media/hart.svg' },
                    { 'name': 'frisch', 'image': 'media/frisch.svg' },
                    { 'name': 'flächig', 'image': 'media/flaechig.svg' },
                    { 'name': 'sauer', 'image': 'media/sauer.svg' },
                    { 'name': 'eckig', 'image': 'media/eckig.svg' },
                    { 'name': 'luftig', 'image': 'media/luftig.svg' },
                    { 'name': 'dumpf', 'image': 'media/dumpf.svg' },
                    { 'name': 'aggressiv', 'image': 'media/aggressiv.svg' },
                    { 'name': 'schwer', 'image': 'media/schwer.svg' },
                    { 'name': 'stechend', 'image': 'media/stechend.svg' },
                    { 'name': 'alt', 'image': 'media/alt.svg' }
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
            service.getSubTerms = function () {
                return Data.subTerms;
            };

            return service;

        }]);
}());