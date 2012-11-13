define(["jquery"], function($) {
	"use strict";
	var BlogPostController = function($scope, $routeParams, $location) {
		var getPostContent = function() {
			$.get("/blog/post/" + $routeParams.slug + "/").
	    		success(function(data) {
	    			if (data.changeSlug != undefined) {
	    				$location.path("/blog/" + data.changeSlug + "/").replace();
	    				$scope.$apply();
	    			} 
					
					$("#post-content").html(data);
	    		});
		};

	    $scope.$on('$viewContentLoaded', function() {
	    	getPostContent();
	    });

	    $scope.editContent = function() {
	    	var markdownTextarea;
	    	$("#post-content .editable").attr("contenteditable", "true");

	    	$("#post-content .markdown-content").addClass("hidden");
	    	$("#post-content .markdown-textarea").removeClass("hidden");


	    	$(".btn.save, .btn.revert, .btn.edit, .btn.preview").toggleClass("hidden");

	    	$("html, body").animate({ scrollTop: $($('.editable')[0]).offset().top - 10 }, 50);
	    };

	    $scope.save = function() {
	    	var i, editables = $(".editable"), editable, newContent = {};
	    	for (i = 0; i < editables.length; i++) {
	    		editable = $(editables[i]);
	    		newContent[editable.attr("name")] = editable.text();
	    	}

	    	newContent.markdown = $("#post-content .markdown-textarea textarea").val();

	    	$.post("/blog/save/" + $routeParams.slug + "/", newContent).success(function(data) {
	    		if (data.status === "success") {
	    			getPostContent();

		    		$(".btn.save, .btn.revert, .btn.edit, .btn.preview").toggleClass("hidden");
	    		} else {
	    			alert("failed to save article :(");
	    		}
	    	});
	    };

	    $scope.revert = function() {
	    	if (confirm("are you sure you want to revert the changes?")) {
		    	getPostContent();

		    	$(".btn.save, .btn.revert, .btn.edit, .btn.preview").toggleClass("hidden");
	    	}	
	    };

	    $scope.preview = function() {

	    };
	};

	return BlogPostController;
});