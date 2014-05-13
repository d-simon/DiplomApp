(function() {
    "use strict";

    angular.module("diplomApp.select.list", ["diplomApp.state", "btford.socket-io"])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.list", {
                        url: "/list/:term",
                        templateUrl: "modules/select/list.tpl.html",
                        controller: "SelectListCtrl",
                        resolve: {
                            resolvedSubTerms: ['DataService', function (dataService) {
                                return dataService.getSubTerms();
                            }]
                        }
                    });
            }
        ])
        .controller('SelectListCtrl', ['$scope', '$stateParams', 'socket', 'DataService', 'StateService', 'resolvedSubTerms', function ($scope, $stateParams, socket, dataService, stateService, resolvedSubTerms) {
            $scope.term = $scope.$stateParams.term;
            $scope.subTerms = resolvedSubTerms;

            dataService.updateState({currentTerm: $stateParams.term, subTerms: []});

            $scope.$on('socket:update:state', function (ev, data) {
                stateService.interpretState(data.currentTerm, data.subTerms);
            });
        }]);

}());