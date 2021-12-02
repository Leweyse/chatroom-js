const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = 8080;

server.listen(PORT, () =>{
    console.log("server running on " + PORT);
});

io.on('connection', (socket) => {
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessageGroup", (message));
    });

    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessagePersonal", (message));
    });
});