var controller = {
    x : 5,
    y : 8,
    construct : function() {
        console.log("constructing controller")
    },
    getPlayerCoords : function() {
        return [this.x, this.y];
    },
    keyLeft : function() {
        this.x--;
    },
    keyRight : function() {
        this.x++;
    },
    keyUp : function() {
        this.y--;
    },
    keyDown : function() {
        this.y++;
    }
}