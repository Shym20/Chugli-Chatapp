const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const namee = prompt("Welcome to CHUGLI!! Enter your name to join the chat :)");
socket.emit('new-user-joined', namee);

socket.on('user-joined', name=>{
    if(name != 'null'){
    append(`${name} joined the chat`,'right')
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`,'right')
})