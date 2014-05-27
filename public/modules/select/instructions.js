(function() {
    "use strict";

    angular.module("diplomApp.select.instructions", ["diplomApp.data", "diplomApp.state", "btford.socket-io"])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.instructions", {
                        url: "",
                        templateUrl: "modules/select/instructions.tpl.html",
                        controller: "SelectInstructionsCtrl",
                        resolve: {
                            resolvedTerms: ['DataService', function (dataService) {
                                return dataService.getTerms();
                            }]
                        }
                    });
            }
        ])
        .controller('SelectInstructionsCtrl', ['$scope', 'socket', 'resolvedTerms', 'DataService', 'StateService',
            function ($scope, socket, resolvedTerms, dataService, stateService) {
                $scope.terms = resolvedTerms;

                dataService.updateState({currentTerm: null, subTerms: []});

                $scope.$on('socket:update:state', function (ev, data) {
                    stateService.interpretState(data.currentTerm, data.subTerms, true);
                });
            }
        ]);

}());