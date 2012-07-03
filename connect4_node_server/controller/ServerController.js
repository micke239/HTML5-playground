var server = net.createServer(function (socket) {
  var user = new User(socket.remoteAddress, socket.remotePort, socket);
  server.addUser(user);
  	
  socket.on('data', function(message) {user.message(message)});

  socket.on('close', function(bool) {user.disconnect(bool)});


  console.log("Successfully connected to " + user);
  socket.write(JSON.stringify({Users: server.getUserNames()}));
});

server.listen(props.port, props.host, function(e) {
	console.log("Successfully listening on " + props.host + ":" + props.port);
});