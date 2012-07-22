var UserController = new events.EventEmitter();

UserController.on('message', function(message, user) {
    var msgObj = JSON.parse(message.utf8Data);
	console.log(msgObj);

    if (msgObj.disconnect) {
        LobbyController.emit('userLeft', user);
    } else if (msgObj.gameRequest) {
        LobbyController.emit('gameRequest', user, msgObj.gameRequest);
        console.log(user + " wants to play with " + msgObj.gameRequest + ".");
    } else if (msgObj.requestAccepted != undefined) {
        LobbyController.emit('requestResponse', user, msgObj.opponent, msgObj.requestAccepted);
    }
});

UserController.on('disconnect', function(causedByError, user) {
    LobbyController.emit('userLeftLobby', user);
});