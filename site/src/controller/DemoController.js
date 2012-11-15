var init = function(app) {
	"use strict";
	
    app.get("/demo/", function(req, res) {
    	res.write("");
    	res.end();
    });
};

module.exports = init;