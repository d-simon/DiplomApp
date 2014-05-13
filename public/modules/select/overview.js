(function() {
    "use strict";

    angular.module("diplomApp.select.overview", ["diplomApp.data", "diplomApp.state", "btford.socket-io"])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.overview", {
                        url: "",
                        templateUrl: "modules/select/overview.tpl.html",
                        controller: "SelectOverviewCtrl",
                        resolve: {
                            resolvedTerms: ['DataService', function (dataService) {
                                return dataService.getTerms();
                            }]
                        }
                    });
            }
        ])
        .controller('SelectOverviewCtrl', ['$scope', '$rootScope', 'socket', 'resolvedTerms', 'DataService', 'StateService', function ($scope, $rootScope, socket, resolvedTerms, dataService, stateService) {
            $scope.terms = resolvedTerms;


            if ($rootScope.isForcedChange !== true) {
                dataService.updateState({currentTerm: null, subTerms: []});
            } else {
                $rootScope.isForcedChange = false;
            }

            $scope.$on('socket:update:state', function (ev, data) {
                stateService.interpretState(data.currentTerm, data.subTerms, true);
            });
        }]);

}());