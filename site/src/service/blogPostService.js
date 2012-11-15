var BlogPostService = function() {
    "use strict";

    var mysqlUtil = require("../util/mysqlUtil"),
    BlogPost = require("../model/BlogPost");

    var assertCallback = function(callback) {
        if (callback && typeof callback !== "function") {
            throw new Error("Callback parameter needs to be a function.");
        }
    }

    this.getBlogPost = function (id, callback) {
        assertCallback(callback);

        BlogPost.findOne({"_id": id}, function(err, res) {
            if (err) {
                console.error("Error when fetching BlogPost with id " + id + ": " + err);
                callback();
            }

            callback(res);
        });
    };

    this.getAll = function(callback) {
        assertCallback(callback);

        BlogPost.find(function (err, res) {
            if (err) {
                console.error("Error when fetching all BlogPosts: " + err);
                callback();
            }
            
            callback(res);
        });
    };
    
    this.update = function(blogPost, callback) {
        assertCallback(callback);

        BlogPost.update({_id: blogPost._id}, {
                heading: blogPost.heading,
                content: blogPost.content,
                edited: new Date()
            }, function(err, numberAffected) {
            if (err) {
                console.error("Error when executing update on BlogPost with id " + blogPost._id + ": " + err);
                callback(false);
            }

            callback(numberAffected === 1);
        });
    };
};

module.exports = new BlogPostService();
