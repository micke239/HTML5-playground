vm = require('vm'), fs = require('fs'), events = require('events');
props = require('./properties');
io = require("socket.io").listen(props.port);

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