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
        .controller('DisplayCtrl', ['$scope', '$rootScope', 'socket', 'DataService',
            function ($scope, $rootScope, socket, dataService) {

                dataService.getState().then(function (response) {
                    $scope.state = response.data;
                });

                $scope.$on('socket:update:state', function (ev, data) {
                    $scope.state = data;
                });

            }
        ]);

}());