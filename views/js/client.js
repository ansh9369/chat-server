// // const socket = io('http://localhost:8000');
// const socket = io(`${window.location.protocol}//${window.location.host}`);

// console.log(socket);

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");
// const username = document.getElementById("user");
// // let element = document.querySelector('feedback');
// // var audio = new Audio('tone.mp3');
// var audio = new Audio('tone.mp3')

// const append = (message, position) => {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     scrollToBottom()
//     if (position == 'left') {
//         audio.play();
//     }
// };

// // messageInput.addEventListener('focus', (e)=> {
// //     socket.emit('feedback',{
// //         feedback: `${name.value} is typing a message`,
// //     })
// // })
// // messageInput.addEventListener('keypress', (e)=>{
// //     socket.emit('feedback',{
// //         feedback: `${name.value} is typing a message`,
// //     })
// // })
// // messageInput.addEventListener('blur', (e)=>{
// //     socket.emit('feedback',{
// //         feedback: '',
// //     })
// // })


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right');
//     socket.emit('send', message);
//     messageInput.value = ''
// });

// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);

// sessionStorage.setItem("name", name);

// const sessionData = sessionStorage.getItem("name");

// username.innerText = sessionData;

// socket.on('user-joined', name => {
//     append(`${name} joined the chat`, 'left');
//     scrollToBottom()
// })
// socket.on('receive', data => {
//     append(`${data.name}: ${data.message}`, 'left');
//     scrollToBottom()
// })
// socket.on('left', name => {
//     append(`${name} left the chat`, 'left');
//     scrollToBottom()
// })
// // socket.on('feedback', (data) =>{
// //     let element = `
// //             <li class="message-feedback">
// //             <p class="feedback", id="feedback">${data.feedback}</p>
// //         </li> 
// //     `
// //     messageContainer.innerHTML += element
// // })

// function scrollToBottom(){
//     messageContainer.scrollTop = messageContainer.scrollHeight
// }





//////////ClientUpdate0.2//////////////////////

const socket = io(`${window.location.protocol}//${window.location.host}`);

console.log(socket);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const username = document.getElementById("user");
// var audio = new Audio('tone.mp3');
var audio = new Audio('tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    scrollToBottom();
    if (position === 'left') {
        audio.play();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name = prompt("Enter your name to join");
const roomId = prompt("Enter the room ID or channel name to join");

socket.emit('join-room', roomId, name);  // Join a specific room with a room ID and username

sessionStorage.setItem("name", name);
sessionStorage.setItem("roomId", roomId);

const sessionData = sessionStorage.getItem("name");
username.innerText = sessionData;

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'left');
    scrollToBottom();
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
    scrollToBottom();
});

socket.on('left', (name) => {
    append(`${name} left the chat`, 'left');
    scrollToBottom();
});

function scrollToBottom(){
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
