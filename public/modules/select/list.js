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
        .controller('SelectListCtrl', ['$scope', '$state', '$stateParams', 'socket', 'DataService', 'StateService', 'resolvedSubTerms',
            function ($scope, $state, $stateParams, socket, dataService, stateService, resolvedSubTerms) {
                $scope.state = {
                    term: null,
                    subTerms: []
                };
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
                    console.log(selectedIndex, term, $scope.state.subTerms);
                    if (selectedIndex > -1) {
                        $scope.state.subTerms.splice(selectedIndex, 1);
                        dataService.updateState($scope.state)
                            .then(function (response) {
                                $scope.state = response.data;
                            });
                    } else {
                        if ($scope.state.subTerms.length >= 3) {
                            $scope.state.subTerms.shift(0,1);
                        }
                        $scope.state.subTerms.push(term);
                        dataService.updateState($scope.state)
                            .then(function (response) {
                                $scope.state = response.data;
                            });
                    }
                };

                $scope.isSelected = function (newTermName) {
                    for (var i = 0; i < $scope.state.subTerms.length; i++) {
                        if (newTermName == $scope.state.subTerms[i].name) return true;
                    }
                    return false;
                };

                $scope.print = function () {
                    stateService.print().then(function (response) {
                        $state.go('select.overview');
                    });
                };
        }]);

}());