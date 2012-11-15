var init = function(app) {
	"use strict";

	var stringUtil = require("../util/stringUtil"),
		blogPostService = require("../service/blogPostService");

	app.get("/blog/", function(req, res) {
        blogPostService.getAll(function(posts) {
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
    
    app.get("/blog/post/:id/:slug/", function(req, res) {
        var id = req.params.id;
        blogPostService.getBlogPost(id, function(post) {
            if (post) {
            	var postSlug = stringUtil.sluggify(post.heading);
                if (postSlug != req.params.slug) {
                    res.json({changeSlug: postSlug});
                    res.end();
                } else {
                    res.render("postcontent", {
                        "post": post
                    });
                }        
            } else {
                res.status(404);
                res.end();
            }
        });
    });

    app.post("/blog/update/", function(req, res) {
        blogPostService.update(req.body, function(result) {
            if (result) {
                res.json({status: "success"});
            } else {
                res.json({status: "failure"});
            }
            
            res.end();
        });
    });

    app.post("/blog/convert-markdown/", function(req, res) {
        if (req.body.markdown) {
            res.write(stringUtil.markdown(req.body.markdown));
        } else {
            res.write("");
        }

        res.end();
    });
};

module.exports = init;