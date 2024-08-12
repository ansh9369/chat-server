// const socket = io('http://localhost:8000');
const socket = io('https://node-server-five-pearl.vercel.app/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
// let element = document.querySelector('feedback');
// var audio = new Audio('tone.mp3');
var audio = new Audio('tone.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
};

// messageInput.addEventListener('focus', (e)=> {
//     socket.emit('feedback',{
//         feedback: `${name.value} is typing a message`,
//     })
// })
// messageInput.addEventListener('keypress', (e)=>{
//     socket.emit('feedback',{
//         feedback: `${name.value} is typing a message`,
//     })
// })
// messageInput.addEventListener('blur', (e)=>{
//     socket.emit('feedback',{
//         feedback: '',
//     })
// })


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
});

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})
// socket.on('feedback', (data) =>{
//     let element = `
//             <li class="message-feedback">
//             <p class="feedback", id="feedback">${data.feedback}</p>
//         </li> 
//     `
//     messageContainer.innerHTML += element
// })