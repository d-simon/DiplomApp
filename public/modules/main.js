(function() {
    "use strict";

    angular.module("diplomApp", [
        "ui.router",
        "btford.socket-io",
        "diplomApp.select"
    ])
        .config(["$urlRouterProvider",
            function($urlRouterProvider) {
                $urlRouterProvider.otherwise("/select");
            }
        ])
        .run(["$rootScope", "$state", "$stateParams",
            function($rootScope, $state, $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ui-sref-active="active }"> will set the <li> // to active whenever
                // 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

}());
