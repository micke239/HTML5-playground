module.exports = (function () {"use strict";

    var factory = require("./factory"),
    mysqlUtils = require("./mysqlUtils");
    
    var assertCallback = function(callback) {
    	if (callback && typeof callback !== "function") {
    		throw new Error("Callback parameter needs to be a function.");
    	}
    }

    return {
        getArticle : function (id, callback) {
        	if (callback) {
        		assertCallback(callback);
        	} else {
        		return;
         	}
         	
            factory.getDbConnection().query("select * from article where id = " + id, function (err, res) {
                if (err) {
                    throw err;
                }

                callback(res[0]);
            });
        },
        getAll: function(callback) {
        	if (callback) {
        		assertCallback(callback);
        	} else {
        		return;
         	}
         	
         	factory.getDbConnection().query("select * from article", function (err, res) {
         		if (err) {
         			throw err;
         		}
         		
         		callback(res);
         	});
        },
        save: function(article, callback) {
            if (callback) {
                assertCallback(callback);
            }    

            var updateStatement = "UPDATE article " +
                "SET content = ?, heading = ?, edited = ? " +
                "WHERE id = ?";

            factory.getDbConnection().query(updateStatement, [article.content, article.heading, mysqlUtils.toMysqlDateFormat(new Date()), article.id], function(err, res) {
                    if (err) {
                        throw err;
                    }

                    if (callback) {
                        callback(res);
                    }
                })
        }
    };
})();

