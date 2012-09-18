(function() {
    var express = require("express"), app = express();

    app.configure(function() {
        app.set("views", __dirname + "/client/views");
        app.set('view engine', 'jade');
        app.set("view options", {
            "layout" : false,
            "pretty" : true
        });
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(__dirname + "/client"));
        app.use(app.router);
    });

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/blog/", function(req, res) {
        res.write("");
        res.end();
    });
    
    app.get("/blog/post/", function(req, res) {
    	res.render("blog-post", {
    		admin: true
    	});
    });
    
    app.get("/blog/post/:id/", function(req, res) {
    	res.sendfile(__dirname + "/client/temp.html");
    });
    
    app.get("/demo/", function(req, res) {
    	res.write("");
    	res.end();
    });
    
    app.get("/links/", function(req, res) {
    	res.write("");
    	res.end();
    });

    app.listen(4711);
})();
