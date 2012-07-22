wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	console.log("Accepted a request from origin " + request.origin);
	
	var user = new User(connection.remoteAddress, connection.socket.remotePort, connection);
  
    LobbyController.emit('userJoinedLobby', user);
  
    connection.on('message', function(message) {
        UserController.emit('message', message, user);
    });

    connection.on('close', function(bool) {
		console.log("received close from " + user);
        UserController.emit('disconnect', bool, user);
    });

    console.log("Successfully connected to " + user + ".");
});