module.exports = (function() {
	"use strict";
	
	var createMySQLClient = function() {
		var mysql = require("mysql");
		var	connection = mysql.createConnection({host : 'localhost', user: 'root', database : 'site'});
		connection.connect(function(err) {
			if (err) throw err;
		});
		
		return connection;
	};

	
	var connection = createMySQLClient();
	
		
	return {
		getDbConnection: function() {
			return connection;	
		}
	};
})();
