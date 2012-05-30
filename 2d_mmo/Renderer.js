function Renderer(ctx, width, height, controller) {
    this.renderTimerId;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.controller = controller;
    this.aimedFps = 60;
    
    this.construct = function() {
        var self = this;
        renderTimerId = setInterval(function() {self.run();}, 5);
    };

    this.run = function() {
        //clear screen
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, width, height);
        
        //draw player
        this.ctx.fillStyle = "#F00";
        var coords = this.controller.getPlayerCoords();
        this.ctx.fillRect(coords[0]-5, coords[1]-5,10,10);
    };
}