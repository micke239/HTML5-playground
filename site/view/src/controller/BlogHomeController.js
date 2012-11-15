define(["jquery"], function($) {
	var BlogHomeController = function($scope, $routeParams, $location) {
		$scope.new = function() {
			alert("new");
		};
	}

	return BlogHomeController;
});