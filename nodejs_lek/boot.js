/**
 * Module dependencies.
 */

var vm = require('vm'), fs = require('fs');

module.exports = function(context, js_main_folder){
    module.context = context;
    readFiles(js_main_folder);
};

function readFiles(dir) {
    // grab a list of our route files
    console.log("Running JavaScript files in " + dir + ".");
    fs.readdirSync(dir).forEach(function(file){
        file = dir + '/' + file;

        var stats = fs.lstatSync(file);

        if (stats.isFile()) {
            if (file.lastIndexOf('.js') == file.length - 3) {
                var str = fs.readFileSync(file, 'utf8');

                for (var key in global) {
                    module.context[key] = global[key];
                }

                vm.runInNewContext(str, module.context, file);
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