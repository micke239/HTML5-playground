vm = require('vm')
fs = require('fs')
events = require('events');
props = require('./properties');
var WebSocketServer = require('websocket').server;
http = require('http');

server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(props.port, function() {
    console.log((new Date()) + ' Server is listening on port ' + props.port);
});

wsServer = new WebSocketServer({httpServer: server, autoAcceptConnections: false});

var count = 0;

function readFiles(dir) {
    // grab a list of our route files
    fs.readdirSync(dir).forEach(function(file){
        file = dir + '/' + file;

        var stats = fs.lstatSync(file);

        if (stats.isFile()) {
            if (file.lastIndexOf('.js') == file.length - 3) {
                var str = fs.readFileSync(file, 'utf8');

                vm.runInThisContext(str, file);
                count++;
                console.log(file + " was included.");
            }
        } else if (stats.isDirectory()) {
            readFiles(file);
        }
    });
}

for (var i = 0; i < props.source_folders.length; i++) {
    readFiles(__dirname + props.source_folders[i]);
}

console.log("Included " + count + " JavaScript files.");