/**
 * Module dependencies.
 */

var vm = require('vm'), fs = require('fs');
var count = 0;

module.exports = function(context, folders){
    module.context = context;
    for (var i = 0; i < folders.length; i++) {
        readFiles(__dirname + folders[i]);
    }
    console.log("Initialized " + count + " JavaScript files.");
};

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
                console.log(file + " was initilaized.");
            }
        } else if (stats.isDirectory()) {
            readFiles(file);
        }
    });
}



// inject some pseudo globals by evaluating
// the file with vm.runInNewContext()
// instead of loading it with require(). require's
// internals use similar, so dont be afraid of "boot time".
// we have to merge the globals for console, process etc

// note that this is essentially no different than ... just using
// global variables, though it's only YOUR code that could influence
// them, which is a bonus.