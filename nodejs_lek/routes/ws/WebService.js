/**
 * Created with JetBrains WebStorm.
 * User: micke
 * Date: 2012-06-28
 * Time: 12:02
 * To change this template use File | Settings | File Templates.
 */

app.get('/ws/getMap', function(req, res){

    var tiles_variants = ["r", "g", "b"];

    var rows = req.query["rows"] ? req.query["rows"] : 8;
    var cols = req.query["cols"] ? req.query["cols"] : 8;

    var map = new Array();

    for (var i = 0; i < rows; i++) {
        map.push(new Array());
        for (var j = 0; j < cols; j++) {
            map[i].push(tiles_variants[Math.floor((Math.random()*3))]);
        }
    }

    res.contentType("application/json");
    res.end(JSON.stringify(map));
});