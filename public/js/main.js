(function() {
    "use strict";
    angular.module("DiplomApp", [
        "ui.router",
        "btford.socket-io"
    ])
        .config(["$stateProvider", "$urlRouterProvider",
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/select/overview");
                $stateProvider
                    .state('selectScreen', {
                        url: "/select",
                        abstract: true,
                        template: '<ui-view/>'
                    })
                    .state('selectScreen.overview', {
                        url: "/overview",
                        templateUrl: "partials/select.overview.tpl.html",
                        controller: function($scope) {
                            console.log("overview");
                            $scope.derp = [
                            	"nein",
                            	"doch",
                            	"oooh"
                            ];
                            $scope.delete = function (index) {
                            	$scope.derp.splice(index,1);
                            }

                            $scope.add = function () {
                            	for (var i = 10000 - 1; i >= 0; i--) {
                            	$scope.derp.push("derp");
                            	};
                            }

                        }
                    })
                    .state('selectScreen.list', {
                        url: "/list/:term",
                        templateUrl: "partials/select.list.tpl.html",
                        controller: function($scope) {
                            console.log($scope.$stateParams);
                        }
                    });
            }
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ui-sref-active="active }"> will set the <li> // to active whenever
                // 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                console.log("run");
            }
        ]);
}());
