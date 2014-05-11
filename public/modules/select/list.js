(function() {
    "use strict";

    angular.module("diplomApp.select.list", [])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select.list", {
                        url: "/list/:term",
                        templateUrl: "modules/select/list.tpl.html",
                        controller: "SelectListCtrl"
                    });
            }
        ])
        .controller('SelectListCtrl', ['$scope', function ($scope) {
            $scope.term = $scope.$stateParams.term;
        }]);

}());