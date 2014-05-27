(function() {
    "use strict";

    angular.module("diplomApp.select", [
        "diplomApp.select.overview",
        "diplomApp.select.list",
        "diplomApp.select.instructions"
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