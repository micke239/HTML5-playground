var User = function(ip, port, socket) {
    this.ip = ip;
    this.port = port;
    this.socket = socket;
    this.userName = "Guest" + Math.floor(Math.random()*1000000);

    this.toString = function() {
        return this.userName + " on " + this.ip + ":" + this.port;
    };

    this.getUserName = function() {
        return this.userName;
    };

    this.getSocket = function() {
        return this.socket;
    };

    this.gameRequest = function(opponent) {
        this.write({
            game_request: opponent.getUserName()
        });
    };

    this.requestResponse = function(opponentName, accepted) {
        var response = {request_accepted : accepted, opponent : opponentName};

        this.write(response);
    };

    this.frenemyAvailable = function(frenemy) {
        this.write({
            new_user: frenemy.getUserName()
        });
    };

    this.frenemyNotAvailable = function(frenemy) {
        this.write({
            user_disconnect: frenemy.getUserName()
        });
    };


    this.write = function(object) {
        socket.write(JSON.stringify(object));
        console.log("Wrote " + JSON.stringify(object) + " to " + this.toString());
    }
};