var init = function(app) {
	"use strict";

	var stringUtil = require("../util/stringUtil"),
    	months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    	days = ["st", "nd", "rd", "th"];

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
        return stringUtil.markdown(md);
    };

    app.locals.createBlogPostUri = function(post) {
        return "/#!/blog/" + post._id + "/" + stringUtil.sluggify(post.heading) + "/";
    };
};

module.exports = init;