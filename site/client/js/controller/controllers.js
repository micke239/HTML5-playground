define(["jquery"], function($) {
	var getId = function(slug) {
		return slug.split('-')[0];
	};
	
	var blogPostController = function($scope, $routeParams, $http) {
			
	    $scope.$on('$viewContentLoaded', function() {
	    	$http.get("/blog/post/" + getId($routeParams.slug) + "/").
	    		success(function(data) {
	    			$("#post-content").html(data);
	    		});
	    });
	}
	
	return {blogPostController: blogPostController}
});
