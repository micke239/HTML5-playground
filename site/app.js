"use strict";

var express = require("express"), 
    app = express();

app.configure(function() {
    app.set("views", __dirname + "/view/jade");
    app.set('view engine', 'jade');
    app.set("view options", {
        "layout" : false,
        "pretty" : true
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + "/view"));
    app.use(app.router);
});

app.get("/", function(req, res) {
    res.render("index");
});

require("./src/controller/BlogController")(app);
require("./src/controller/DemoController")(app);
require("./src/controller/LinkController")(app);
require("./src/controller/LocalsController")(app);

app.listen(4711);
