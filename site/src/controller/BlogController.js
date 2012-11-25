var init = function(app) {
	"use strict";

    var admin = false;

	var stringUtil = require("../util/stringUtil"),
		blogPostService = require("../service/blogPostService");

	app.get("/blog/", function(req, res) {
        if (!admin) {
            blogPostService.getAllPublished(function(posts) {
                res.render("blog", {
                    posts: posts,
                    admin: admin
                });
            });
        } else {
            blogPostService.getAll(function(posts) {
                res.render("blog", {
                    posts: posts,
                    admin: admin
                });
            });
        }
    });

    app.get("/blog/create/", function(req, res) {
        blogPostService.createBlogPost(function(result) {
            if (result) {
                res.json({
                    redirect: app.locals.createUriWithoutHashbang(result.blogPost.id, result.content.heading)
                });
            } else {
                res.json(false);
            }

            res.end();
        });
    });
    
    app.get("/blog/post/", function(req, res) {
    	res.render("blog-post", {
    		admin: admin
    	});
    });
    
    app.get("/blog/post/:id/:slug/", function(req, res) {
        var id = req.params.id;
        blogPostService.getBlogPost(id, function(post) {
            post = app.locals.getBlogPostContent(post, admin);

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
                res.end("The blog post is not published or does not exist.");
            }
        });
    });

    app.post("/blog/publish/", function(req, res) {
        blogPostService.publish(req.body._id, function(result) {
            res.json({success: result});
            res.end();
        });
    });

    app.post("/blog/unpublish/", function(req, res) {
        blogPostService.unpublish(req.body._id, function(result) {
            res.json({success: result});
            res.end();
        });
    });

    app.post("/blog/save/", function(req, res) {
        blogPostService.save(req.body, function(result) {
            if (result) {
                res.json({
                    success: true,
                    id: result.id,
                    slug: stringUtil.sluggify(result.heading)
                });
            } else {
                res.json({success: false});
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