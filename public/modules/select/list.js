(function() {
    "use strict";

    angular.module("diplomApp.select.list", ["diplomApp.state", "btford.socket-io"])
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
        .controller('SelectListCtrl', ['$scope', '$rootScope', '$stateParams', 'socket', 'DataService', 'StateService', function ($scope, $rootScope, $stateParams, socket, dataService, stateService) {
            $scope.term = $scope.$stateParams.term;

            if ($rootScope.isForcedChange !== true) {
                dataService.updateState({currentTerm: $stateParams.term, subTerms: []});
            } else {
                $rootScope.isForcedChange = false;
            }

            $scope.$on('socket:update:state', function (ev, data) {
                stateService.interpretState(data.currentTerm, data.subTerms);
            });
        }]);

}());