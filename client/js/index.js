import { Message } from "./components/message.component.js";

let socket = io.connect();

const msgGroup = document.getElementById('msg-group');
const msgPersonal = document.getElementById('msg-personal');

const msg = document.getElementById('msg');
const sendToAll = document.getElementById('sendToAll');
const sendToMe = document.getElementById('sendToMe');

const isScrolledToBottom = (elem) => elem.scrollHeight - elem.clientHeight <= elem.scrollTop + 1;

sendToAll.addEventListener('click', () => {
    socket.emit('sendToAll', msg.value);
})

sendToMe.addEventListener('click', () => {
    socket.emit('sendToMe', msg.value);
})

socket.on('displayMessageGroup', (msg) => {
    msgGroup.appendChild(Message(msg));
    if (isScrolledToBottom) msgGroup.scrollTop = msgGroup.scrollHeight - msgGroup.clientHeight;
});

socket.on('displayMessagePersonal', (msg) => {
    msgPersonal.appendChild(Message(msg));
    if (isScrolledToBottom) msgPersonal.scrollTop = msgPersonal.scrollHeight - msgPersonal.clientHeight;
});