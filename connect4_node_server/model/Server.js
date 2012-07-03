var server = {
	connectedUsers: [],
	getUserNames: function() {
		var array = new Array();
		for (var i = 0; i < this.connectedUsers.length; i++) {
			array.push(this.connectedUsers[i].getUserName());
		}
		return array;
	},
	addUser: function(user) {
		this.connectedUsers.push(user);
	}
}