
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

var mysql = require('mysql');
var connection = mysql.createConnection({host : 'localhost', user: 'root', database : 'metrojobb'});

var app_props = require("./properties/application_properties");

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require("./boot")({ app: app, db: connection }, __dirname + "/routes");

app.listen(app_props.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
