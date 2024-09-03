
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

// Route for the root URL
app.get('/', (req, res) => {
    // Check if there are any query parameters
    if (Object.keys(req.query).length === 0) {
        res.render("newchat"); // No query parameters
    } else {
        res.render('index'); // Has query parameters
    }
});

// Wildcard route to match any path with a parameter
app.get('/*', (req, res) => {
    res.render('index');
});

// Create the HTTP server using the Express app
const server = http.createServer(app);

const socketIo = new Server(server, {
    cors: {
        origin: '*', // Allow any origin for testing purposes. This should be changed in production.
    },
});

const users = {}; // To store users in specific rooms

socketIo.on('connection', (socket) => {
    // Join a specific room
    socket.on('join-room', (roomId, name) => {
        socket.join(roomId);
        users[socket.id] = { name, roomId };
        socket.to(roomId).emit('user-joined', name); // Notify others in the room
    });

    socket.on('send', (message) => {
        const user = users[socket.id];
        if (user) {
            socket.to(user.roomId).emit('receive', { message: message, name: user.name });
        }
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            socket.to(user.roomId).emit('left', user.name);
            delete users[socket.id];
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
