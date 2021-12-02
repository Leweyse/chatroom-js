import { Message } from "./components/message.component.js";

let socket = io.connect();

const msgGroup = document.getElementById('msg-group');
const msgPersonal = document.getElementById('msg-personal');

const group = document.getElementById('group');
const personal = document.getElementById('personal');

const msg = document.getElementById('msg');
const sendToAll = document.getElementById('sendToAll');
const sendToMe = document.getElementById('sendToMe');

const keys = [];

window.addEventListener('keydown', (event) => {
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
})

window.addEventListener('keyup', (event) => {
    if (keys[0] === 'Enter') {
        sendToAll.click();
    }
    keys.splice(keys.indexOf(event.key), 1);
})

sendToAll.addEventListener('click', () => {
    if (msg.value.length > 0) {
        socket.emit('sendToAll', msg.value);   
    }

    msg.value = "";
})

sendToMe.addEventListener('click', () => {
    if (msg.value.length > 0) {
        socket.emit('sendToMe', msg.value);
    }
    
    keys.length = 0;
    msg.value = "";
})

socket.on('displayMessageGroup', (msg) => {
    group.appendChild(Message(msg));
    msgGroup.scrollTop = msgGroup.scrollHeight - msgGroup.clientHeight;
});

socket.on('displayMessagePersonal', (msg) => {
    personal.appendChild(Message(msg));
    msgPersonal.scrollTop = msgPersonal.scrollHeight - msgPersonal.clientHeight;
});