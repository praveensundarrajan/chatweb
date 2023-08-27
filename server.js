{
	"name": "sample",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"type": "module",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "node server.js"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"express": "^4.18.2"
	}
}

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chatMessage', (data) => {
    io.emit('chatMessage', data);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
