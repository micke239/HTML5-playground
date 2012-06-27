$(document).ready(function() {
    var JQCanvas = $('canvas');
    JQCanvas.css('width', JQCanvas.parent().width());
    var canvas = JQCanvas[0];
    canvas.style.height = (canvas.height/canvas.width * parseInt(canvas.style.width)) + "px";

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0,255,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});