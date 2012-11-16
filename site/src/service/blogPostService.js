var BlogPostService = function() {
    "use strict";

    var blogPostContentService = require("./blogPostContentService"),
        BlogPost = require("../model/BlogPost"),
        self = this;

    this.getBlogPost = function (id, callback) {
        BlogPost.findById(id).populate("live").populate("preview").exec(function(err, res) {
            if (err) {
                console.error("Error when fetching BlogPost with id " + id + ": " + err);
                callback();
            }

            callback(res);
        });
    };

    this.getAll = function(callback) {
        BlogPost.find().populate("live").populate("preview").exec(function (err, res) {
            if (err) {
                console.error("Error when fetching all BlogPosts: " + err);
                callback();
            }
            
            callback(res);
        });
    };

    this.getAllPublished = function(callback) {
        BlogPost.where("live").ne(null).populate("live").populate("preview").exec(function (err, res) {
            if (err) {
                console.error("Error when fetching all published BlogPosts: " + err);
                callback();
            }
            
            callback(res);
        });
    };

    this.publish = function(id, callback) {
        self.getBlogPost(id, function(blogPost) {
            if (!blogPost) {
                var postUpdated = function(err, numberAffected) {
                    if (err) {
                        console.error("Error when executing update on BlogPost with id " + blogPost._id + ": " + err);
                        callback(false);
                    }

                    callback(numberAffected === 1);                    
                };

                BlogPost.update({_id: blogPost._id}, { preview: null, live: blogPost.preview }, postUpdated);
            }
        });
    };

    this.save = function(blogPost, callback) {
         var contentSaved = function(content) {
            if (content) {
                var blogPost = new BlogPost({
                    created: new Date(),
                    preview: content
                });

                var postSaved = function(err) {
                    if (err) {
                        console.error("Error when executing update on BlogPost with id " + blogPost._id + ": " + err);
                        callback(false);
                    }

                    callback(true);                
                };  
                
                blogPost.save(postSaved);
            } else {
                callback(false);
            }         
        };

        var content = {
            heading: blogPost.heading,
            content: blogPost.content,
            edited: new Date()
        };

        blogPostContentService.save(content, contentSaved);      
    };
    
    this.update = function(blogPost, callback) {
        var contentSaved = function(content) {
            if (content) {
                var postUpdated = function(err, numberAffected) {
                    if (err) {
                        console.error("Error when executing update on BlogPost with id " + blogPost._id + ": " + err);
                        callback(false);
                    }

                    callback(numberAffected === 1);                
                };  
                
                BlogPost.update({_id: blogPost._id}, { preview: content._id }, postUpdated);
            } else {
                callback(false);
            }         
        };

        var content = {
            heading: blogPost.heading,
            content: blogPost.content,
            edited: new Date()
        };

        blogPostContentService.save(content, contentSaved);
    };
};

module.exports = new BlogPostService();
