var LobbyController = new events.EventEmitter();

LobbyController.on("userJoinedLobby", function(frenemy) {
    lobby.joinLobby(frenemy);
});

LobbyController.on("userLeftLobby", function(frenemy) {
    lobby.leaveLobby(frenemy);
});

LobbyController.on("gameRequest", function(frenemy, requestedUsersName) {
    lobby.gameRequest(frenemy, requestedUsersName);
});

LobbyController.on("requestResponse", function(requestedFrenemy, requestersName, accepted) {
	lobby.requestResponse(requestedFrenemy, requestersName, accepted);
});