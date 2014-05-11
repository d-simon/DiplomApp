(function() {
    "use strict";

    angular.module("diplomApp.select.overview", [])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.overview", {
                        url: "",
                        templateUrl: "modules/select/overview.tpl.html",
                        controller: "SelectOverviewCtrl"
                    });
            }
        ])
        .controller('SelectOverviewCtrl', ['$scope', function ($scope) {
            $scope.derp = [
                "nein",
                "doch",
                "oooh"
            ];
            $scope.delete = function (index) {
                $scope.derp.splice(index,1);
            }

            $scope.add = function () {
                $scope.derp.push("derp");
            }
        }]);

}());