let socket = io.connect("http://localhost:8080/");

const target = document.querySelector('#target p');
const msg = document.getElementById('msg');
const sendToAll = document.getElementById('sendToAll');
const sendToMe = document.getElementById('sendToMe');

sendToAll.addEventListener('click', () => {
    socket.emit('sendToAll', msg.value);
})

sendToMe.addEventListener('click', () => {
    socket.emit('sendToMe', msg.value);
})

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});