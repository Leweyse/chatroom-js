const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = require('socket.io')(server);

let counter = 0

server.listen(8080, () =>{
    console.log("server running on " + 8080);
});

io.on('connection', (socket) => {
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
        console.log(message);
    });

    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
        console.log(message);
    });

    console.log(counter);
    counter++;
});