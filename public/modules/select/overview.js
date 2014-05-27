(function() {
    "use strict";

    angular.module("diplomApp.select.overview", ["diplomApp.data", "diplomApp.state", "btford.socket-io"])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.overview", {
                        url: "/overview",
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
        .controller('SelectOverviewCtrl', ['$scope', 'socket', 'resolvedTerms', 'DataService', 'StateService', function ($scope, socket, resolvedTerms, dataService, stateService) {
            $scope.terms = resolvedTerms;

            dataService.updateState({currentTerm: null, subTerms: []});

            $scope.$on('socket:update:state', function (ev, data) {
                stateService.interpretState(data.currentTerm, data.subTerms, true);
            });
        }]);

}());