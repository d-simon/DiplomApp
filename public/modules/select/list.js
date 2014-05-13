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
        .controller('SelectListCtrl', ['$scope', '$stateParams', 'socket', 'DataService', 'StateService', 'resolvedSubTerms', 
            function ($scope, $stateParams, socket, dataService, stateService, resolvedSubTerms) {
                $scope.term = $scope.$stateParams.term;
                $scope.subTerms = resolvedSubTerms;

                dataService.updateState({currentTerm: $stateParams.term, subTerms: []})
                    .then(function (response) {
                        $scope.state = response.data;
                    });

                $scope.$on('socket:update:state', function (ev, data) {
                    stateService.interpretState(data.currentTerm, data.subTerms);
                });

                $scope.select = function (term) {
                    var selectedIndex = $scope.state.subTerms.indexOf(term);
                    if (selectedIndex > -1) {
                        $scope.state.subTerms.splice(selectedIndex, 1);
                        dataService.updateState($scope.state)
                    } else if ($scope.state.subTerms.length < 3) {
                        $scope.state.subTerms.push(term);
                        dataService.updateState($scope.state)
                    }
                };
        }]);

}());