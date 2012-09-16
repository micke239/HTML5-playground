define(["lib/angular-1.0.1.min"], function (angular) {
	if (typeof _ != "undefined") {
		_.noConflict();
	}

	if(typeof $ != "undefined") {
		$.noConflict() ;
	}
    return window.angular;
});