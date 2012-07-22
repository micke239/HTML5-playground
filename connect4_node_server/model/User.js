var User = function(ip, port, connection) {
    this.ip = ip;
    this.port = port;
    this.connection = connection;
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
            gameRequest: opponent.getUserName()
        });
    };

    this.requestResponse = function(opponentName, accepted) {
        var response = {requestAccepted : accepted, opponent : opponentName};

        this.write(response);
    };

    this.frenemyAvailable = function(frenemy) {
        this.write({
            newUser: frenemy.getUserName()
        });
    };

    this.frenemyNotAvailable = function(frenemy) {
        this.write({
            userDisconnect: frenemy.getUserName()
        });
    };


    this.write = function(object) {
        connection.sendUTF(JSON.stringify(object));
        console.log("Wrote " + JSON.stringify(object) + " to " + this.toString());
    };

	this.ping = function(object) {
		
	};
};