var UserController = new events.EventEmitter();

UserController.on('message', function(message, user) {
    var msgObj = JSON.parse(message);

    if (msgObj.disconnect) {
        LobbyController.emit('userLeft', user);
    } else if (msgObj.game_request) {
        LobbyController.emit('gameRequest', user, msgObj.game_request);
        console.log(user + " wants to play with " + msgObj.game_request + ".");
    } else if (msgObj.request_accepted != undefined) {
        LobbyController.emit('requestResponse', user, msgObj.opponent, msgObj.request_accepted);
    }
});

UserController.on('disconnect', function(causedByError, user) {
    LobbyController.emit('userLeft', user);
});