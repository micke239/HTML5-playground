var User = function(ip, port, socket) {
	this.ip = ip;
	this.port = port;
	this.socket = socket;
	this.userName = "Guest" + Math.floor(Math.random()*1000000);

	this.message = function(message) {
		message = JSON.parse(message);	
	};

	this.disconnect = function(caused_by_error) {
        console.log(this + " has left us. :( " + (caused_by_error ? "This was caused by an error." : ""));
    };

    this.toString = function() {
    	return this.ip + ":" + this.port;
    };

    this.getUserName = function() {
    	return this.userName;
    };
};