const socket = io(`${window.location.protocol}//${window.location.host}`);

console.log(socket);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const username = document.getElementById("user");
const userRoomId = document.getElementById("roomId");

// Sidebar elements
const soundNotificationCheckbox = document.getElementById('soundNotification');
const screenNotificationCheckbox = document.getElementById('screenNotification');
const joinLeaveNotificationCheckbox = document.getElementById('joinLeaveNotification');

// Load saved notification preferences from localStorage
const loadPreferences = () => {
    soundNotificationCheckbox.checked = JSON.parse(localStorage.getItem('soundNotification') || 'true');
    screenNotificationCheckbox.checked = JSON.parse(localStorage.getItem('screenNotification') || 'true');
    joinLeaveNotificationCheckbox.checked = JSON.parse(localStorage.getItem('joinLeaveNotification') || 'true');
};

// Save notification preferences to localStorage
const savePreferences = () => {
    localStorage.setItem('soundNotification', JSON.stringify(soundNotificationCheckbox.checked));
    localStorage.setItem('screenNotification', JSON.stringify(screenNotificationCheckbox.checked));
    localStorage.setItem('joinLeaveNotification', JSON.stringify(joinLeaveNotificationCheckbox.checked));
};

var audio = new Audio('pop.mp3');

// Function to append messages
const append = (message, position, isHtml = false) => {
    const messageElement = document.createElement('div');

    if (isHtml) {
        messageElement.innerHTML = message;
    } else {
        messageElement.innerText = message;
    }

    messageElement.classList.add('message', 'text-wrap', position);
    messageContainer.append(messageElement);
    scrollToBottom();

    if (position === 'left' && soundNotificationCheckbox.checked) {
        audio.play();
    }

    if (position === 'left' && screenNotificationCheckbox.checked) {
        document.title = "New Message!";
        setTimeout(() => { document.title = "ChatBox"; }, 2000);
    }
};

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();

    if (message === '') return;

    append(`<span style="color: purple; font-weight: bold;">You</span>: ${message}`, 'right', true);
    socket.emit('send', message);
    messageInput.value = '';
});

// Prompt user for their name and join room
const name = prompt("Enter your name to join");
const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    roomId = key;
});
socket.emit('join-room', roomId, name);

sessionStorage.setItem("name", name);
sessionStorage.setItem("roomId", roomId);

const sessionData = sessionStorage.getItem("name");
username.innerText = sessionData;
const sessionDatau = sessionStorage.getItem("roomId");
userRoomId.innerText = `(Room ID-${sessionDatau})`;

// Socket event listeners
socket.on('user-joined', (name) => {
    const joinMessage = `<span style="color: green; font-weight: bold;">*${name} joined the chat </span>`;
    append(joinMessage, 'left', true);
    if (joinLeaveNotificationCheckbox.checked) {
        alert(`${name} has joined the chat.`);
    }
    scrollToBottom();
});

socket.on('receive', (data) => {
    const formattedMessage = `<span style="color: skyblue; font-weight: bold;">${data.name}</span>: ${data.message}`;
    append(formattedMessage, 'left', true);
    scrollToBottom();
});

socket.on('left', (name) => {
    const leftMessage = `<span style="color: green; font-weight: bold;">${name} left the chat </span>`;
    append(leftMessage, 'left', true);
    if (joinLeaveNotificationCheckbox.checked) {
        alert(`${name} has left the chat.`);
    }
    scrollToBottom();
});

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Load preferences when page loads
loadPreferences();

// Save preferences when any checkbox is toggled
soundNotificationCheckbox.addEventListener('change', savePreferences);
screenNotificationCheckbox.addEventListener('change', savePreferences);
joinLeaveNotificationCheckbox.addEventListener('change', savePreferences);
