(function() {
    "use strict";

    angular.module("diplomApp.select", [
        "diplomApp.select.overview",
        "diplomApp.select.list",
    ])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("select", {
                        url: "/select",
                        abstract: true,
                        template: "<ui-view/>"
                    });
            }
        ]);

}());