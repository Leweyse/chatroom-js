import { User } from "./components/user.component.js";
import { Message } from "./components/message.component.js";

let socket = io.connect('http://localhost:8080/');

const header = document.getElementById('header');
const login = document.getElementById('login');

const userSection = document.getElementById('users-connected');

const msgGroup = document.getElementById('msg-group');
const msgPersonal = document.getElementById('msg-personal');

const group = document.getElementById('group');
const personal = document.getElementById('personal');

const msg = document.getElementById('msg');
const sendToAll = document.getElementById('sendToAll');
const sendToMe = document.getElementById('sendToMe');

login.addEventListener('submit', (event) => {
    event.preventDefault();

    let user = {};

    user.name = event.target[0].value;
    user.color = event.target[1].value;
    user.color = user.color.toLowerCase();

    for (let i = 0; i < event.target.length - 1; i++) {
        event.target[i].value = "";
    }

    socket.emit('user', user);
})

const keys = [];

window.addEventListener('keydown', (event) => {
    if (header.style.display === 'none') {
        const validKeys = ['Enter', 'n'];

        for (let i = 0; i < validKeys.length; i++) {
            if (event.key === validKeys[i] && keys.indexOf(event.key) === -1) {
                keys.push(event.key);
            }   
        }
        if (keys[0] !== 'Enter') {
            keys.length = 0;
        } else {
            event.preventDefault();
            if (keys.length === 2) {
                sendToMe.click();
            }
        }
    } else {
        if (event.key === 'Enter') {
            btnSubmit.click();
        }
    }
})

window.addEventListener('keyup', (event) => {
    if (keys[0] === 'Enter') {
        sendToAll.click();
    }
    keys.splice(keys.indexOf(event.key), 1);
})

sendToAll.addEventListener('click', () => {
    if (msg.value.length > 0 && msg.value.trim()) {
        socket.emit('sendToAll', msg.value);
    }

    msg.value = "";
})

sendToMe.addEventListener('click', () => {
    if (msg.value.length > 0 && msg.value.trim()) {
        socket.emit('sendToMe', msg.value);
    }
    
    keys.length = 0;
    msg.value = "";
})

socket.on('displayUserInfo', (info) => {
    if (info.name !== "" && info.color !== "") {
        header.style.display = 'none';
        msg.focus();
    }
});

socket.on('users', (users) => {
    userSection.innerHTML = "<p class='connected'>Connected</p>";
    users.forEach(user => {
       userSection.appendChild(User(user));
    });
});

socket.on('disconnect', (users) => {
    userSection.innerHTML = "<p class='connected'>Connected</p>";
    users.forEach(user => {
       userSection.appendChild(User(user));
    });
});

socket.on('displayMessageGroup', (data) => {
    group.appendChild(Message(data));
    msgGroup.scrollTop = msgGroup.scrollHeight - msgGroup.clientHeight;
});

socket.on('displayMessagePersonal', (data) => {
    personal.appendChild(Message(data));
    msgPersonal.scrollTop = msgPersonal.scrollHeight - msgPersonal.clientHeight;
});