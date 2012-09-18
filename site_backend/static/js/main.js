require(["app", "controller/controllers"], function (app, controllers) {
    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when("/start/", {
            controller : controllers.startController,
            templateUrl : "/start/"
        }).otherwise({
            redirectTo : "/start/"
        });
    });
});
