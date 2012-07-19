io.sockets.on('connection', function(socket) {
 	var user = new User(socket.remoteAddress, socket.remotePort, socket);
  
    LobbyController.emit('userJoinedLobby', user);
  
    socket.on('data', function(message) {
        UserController.emit('message', message, user);
    });

    socket.on('close', function(bool) {
        UserController.emit('disconnect', bool, user);
    });

    console.log("Successfully connected to " + user + ".");
});