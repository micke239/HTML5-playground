   var markable = false;
   var firstTime = true;
   var points = [];

$(document).ready(function () {
 
    $('body')[0].setAttribute('onSelectStart', 'return false;');
    
    //sets a background to the canvas
    var canvas = $('#mapDrawer');
    var ctx = canvas[0].getContext('2d');
    ctx.fillRect(0,0,canvas[0].width, canvas[0].height);
    ctx.fillStyle = "black";
    ctx.fill();

    $("#array").append ("[");
    $('#mapDrawer').click(function(){
        var drawScale = 10;
        
        var canvas = $('#mapDrawer');
        var ctx = canvas[0].getContext('2d');
        addPoint(event.x, event.y)
        
        var points = getPoints();
        
        ctx.clearRect(0,0,canvas[0].width, canvas[0].height);
        
        //background color should be black!
        ctx.fillRect(0,0,canvas[0].width, canvas[0].height);
        ctx.fillStyle = "black";
        ctx.fill();
        
        //draw lines
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++){
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.strokeStyle = "green";
        ctx.stroke();
        //write coordinates as b2Vec2 arrays in the correct scale
       $("#array").append("new b2Vec2(" + Math.floor(event.x/drawScale) + ", " +
                          Math.floor((canvas[0].height-event.y)/drawScale) + "), ");
       
    });
    
    $('#letmemark').click(function(){
        if (getMarkable()) {
             $('body')[0].setAttribute('onSelectStart', 'return false;');
            setMarkable(false);
             $('#letmemark').val("Let me mark!");
        } else {
            $('body')[0].setAttribute('onSelectStart', 'return true;');
            setMarkable(true);
            $('#letmemark').val("Remove this marking sh!t, it's annoying!");
        }
    });
});

function getMarkable(){
    return markable;
}
function setMarkable(markable2){
    this.markable = markable2;
}
function firstTimeQ(){
    if (firstTime) {
        firstTime = false;
        return true;
    }
    return false;
}
function addPoint(x, y){
    points.push([x, y]);
}
function getPoints(){
    return points;
}

