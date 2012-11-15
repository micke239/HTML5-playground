var createBlogPostModel = function() {
	"use strict";
	
	var dbFactory = require("../factory/dbFactory"),
	Schema = dbFactory.getSchema();

	var blogPostSchema = Schema({
		heading: String,
		content: String,
		created: Date,
		edited: Date
	});

	return dbFactory.getDb().model("BlogPost", blogPostSchema);
}


module.exports = createBlogPostModel();