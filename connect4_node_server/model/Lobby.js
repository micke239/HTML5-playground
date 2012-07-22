var lobby = {
    frenemiesInLobby: {},
    getUserNames: function() {
        var array = new Array();
        for (var userName in this.frenemiesInLobby) {
            array.push(userName);
        }
        return array;
    },
    joinLobby: function(frenemy) {
        this.frenemiesInLobby[frenemy.getUserName()] = frenemy;
        for (var userName in this.frenemiesInLobby) {
            if (frenemy.getUserName() != userName) {
                this.frenemiesInLobby[userName].frenemyAvailable(frenemy);
            }
        }
        
        var users = lobby.getUserNames();

        users.remove(frenemy.getUserName());
        frenemy.write({
            users: users
        });
    },
    leaveLobby: function(frenemy) {
        if (frenemy instanceof User) {
            delete this.frenemiesInLobby[frenemy.getUserName()];
            for (userName in this.frenemiesInLobby) {
                this.frenemiesInLobby[userName].frenemyNotAvailable(frenemy);
            }
        } else if (frenemy instanceof Array) {
            for (var i = 0; i < frenemy.length; i++) {
                for (userName in this.frenemiesInLobby) {
                    if (userName !== frenemy[i].getUserName()) {
                        this.frenemiesInLobby[userName].frenemyNotAvailable(frenemy[i]);
                    }
                }
            }
            for (var i = 0; i < frenemy.length; i++) {
                delete this.frenemiesInLobby[frenemy[i].getUserName()];
            }
        }
    },
    gameRequest: function(frenemy, opponentName) {
        if (this.frenemiesInLobby[opponentName]) {
            this.frenemiesInLobby[opponentName].gameRequest(frenemy);
        } else {
            frenemy.requestResponse(opponentName, false);
        }
    },
    requestResponse: function(requestedFrenemy, requestersName, accepted) {
        var requester = this.frenemiesInLobby[requestersName];
        requester.requestResponse(requestedFrenemy.getUserName(), accepted);

        if (accepted) {
            console.log(requestedFrenemy.getUserName() + " and " + requestersName + " has agreed upon playing a game of connect-4.");

            this.leaveLobby([requester, requestedFrenemy]);

            GameController.emit("newGame", requester, requestedFrenemy);
        }
    }
}