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
    console.log(counter + ' someone connected');
    counter++;
});