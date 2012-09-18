(function() {
    var express = require("express"), 
    	app = express(),
    	article = require("./src/article.js");

    app.configure(function() {
        app.set("views", __dirname + "/views");
        app.set('view engine', 'jade');
        app.set("view options", {
            "layout" : false,
            "pretty" : true
        });
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(__dirname + "/static"));
        app.use(app.router);
    });
    
    app.get("/", function(req, res) {
		res.render("index");
    });
    
    
    app.get("/start/", function(req, res) {
    	article.getAll(function(articles) {
    		res.render("start", {"articles": articles});
    	});
    });
    
    app.listen(4712);
})();