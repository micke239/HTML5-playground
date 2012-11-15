var init = function(app) {
	"use strict";
	
    app.get("/links/", function(req, res) {
    	res.write("");
    	res.end();
    });
};

module.exports = init;