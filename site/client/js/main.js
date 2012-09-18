require(["jquery", "app", "controller/controllers"], function($, app, controllers) {
	app.config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when("/", {
            redirectTo : "/blog/"
        }).when("/blog/", {
            templateUrl : "/blog/"
        }).when("/blog/:slug/", {
            controller : controllers.blogPostController,
            templateUrl : "/blog/post/"
        }).when("/links/", {
            templateUrl : "/links/"
        }).when("/demo/", {
            templateUrl : "/demo/"
        }).otherwise({
            redirectTo : "/blog/"
        });
	});
});
