(function() {
    "use strict";

    angular.module("diplomApp.display", [])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("display", {
                        url: "/display",
                        templateUrl: "modules/display/index.tpl.html",
                        controller: "DisplayCtrl"
                    });
            }
        ])
        .controller('DisplayCtrl', ['$scope', '$rootScope', 'socket', 'DataService', 'StateService',
            function ($scope, $rootScope, socket, dataService, stateService) {

                dataService.getState().then(function (response) {
                    $scope.state = response.data;
                    stateService.interpretDisplayState($scope.state.currentTerm, $scope.state.subTerms, true);
                });

                $scope.$on('socket:update:state', function (ev, data) {
                    $scope.state = data;
                });
            }
        ]);

}());