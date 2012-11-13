(function() {
    var express = require("express"), app = express(), article = require("./src/article.js"),
    ghm = require("ghm"),
    months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    days = ["st", "nd", "rd", "th"];

    var getIdFromSlug = function(slug) {
        return slug.split("-")[0];
    };

    var sluggify = function(entity) {
        var id = entity.id;
        var heading = entity.heading;
        var slug = id + "-";
 
        slug += heading.trim().toLowerCase().
                            replace(/\s/g, "-").
                            replace(/[åä]/g, "a").
                            replace(/[ö]/g,"o").
                            replace(/[^a-z0-9-]/g, "").
                            replace(/-+/g, "-");

        return slug;
    };

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

    app.locals.formatDate = function(date) {
        var twoDigits = function(d) {
            return (0 <= d && d < 10) ? "0" + d.toString() : d.toString();
        }

        return months[date.getMonth()] + " " + 
                date.getDate() + days[date.getDate() > 3 ? 3 : date.getDate()-1] + " " + 
                date.getFullYear() + ", " +
                twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes());
    };

    app.locals.markdown = function(md) {
        return ghm.parse(md);
    };

    app.locals.createBlogPostUri = function(post) {
        return "/#!/blog/" + sluggify(post) + "/";
    };

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/blog/", function(req, res) {
        article.getAll(function(posts) {
            res.render("blog", {
                posts: posts,
                admin: true
            });
        });
    });
    
    app.get("/blog/post/", function(req, res) {
    	res.render("blog-post", {
    		admin: true
    	});
    });
    
    app.get("/blog/post/:slug/", function(req, res) {
        var id = getIdFromSlug(req.params.slug);
        article.getArticle(id, function(post) {
            if (sluggify(post) != req.params.slug) {
                res.json({changeSlug: sluggify(post)});
                res.end();
            } else {
                res.render("postcontent", {
                    "post": post
                });
            }        
        });
    });

    app.post("/blog/save/:slug/", function(req, res) {
        var id = getIdFromSlug(req.params.slug);

        article.save({
            id: id,
            content: req.body.markdown,
            heading: req.body.heading
        }, function(result) {
            if (result.affectedRows == 1) {
                res.json({status: "success"});
            } else {
                res.json({status: "failure"});
            }
            
            res.end();
        });
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
