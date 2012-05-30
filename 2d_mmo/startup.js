var renderer;

$(document).ready(function () {
    $(window).resize(resize);
    resize();
    
    $(window).keydown(keydown);
    
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    
    controller.construct();
    renderer = new Renderer(ctx, $(window).width(), $(window).height(), controller);
    renderer.construct();
});

var kung = "hej";

var resize = function(e) {
    var canvas = $('#canvas')[0];
        
    var width = $(window).width();
    var height = $(window).height();
    $('#canvas').width(width);
    $('#canvas').height(height);
    canvas.width = width;
    canvas.height = height;
    if (renderer) {
        renderer.width = width;
        renderer.height = height;
    }
};

var keydown = function (e) {
    if (e.which == 37) {
        controller.keyLeft();
    }
    if (e.which == 39) {
        controller.keyRight();
    }
    if (e.which == 38) {
        controller.keyUp(); 
    }
    if (e.which == 40) {
        controller.keyDown();
    }
};