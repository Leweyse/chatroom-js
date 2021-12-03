const express = require('express');
const http = require('http');

const User = require('./models/User');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = 8080;

server.listen(PORT, () =>{
    console.log("server running on " + PORT);
});

const users = {};

io.on('connection', (socket) => {
    socket.on('user', (obj) =>{
        if (obj.name !== "" && obj.color !== "") {
            const user = new User();
            const info = {
                name: obj.name,
                color: obj.color
            }

            user.setInfo(info);
            users[socket.id] = user.getInfo();
            socket.emit("displayUserInfo", user.getInfo());
        }
    });

    socket.on('sendToAll', (message) =>{
        io.emit("displayMessageGroup", {
            msg: message,
            name: users[socket.id].name,
            color: users[socket.id].color
        });
    });

    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessagePersonal", {
            msg: message,
            name: users[socket.id].name,
            color: users[socket.id].color
        });
    });
});