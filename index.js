// // const http = require('http');
// // const express = require('express');
// // const {Server} = require('socket.io');
// // const fs = require('fs');
// // const path = require('path')

// // const app = express();
// // const port = process.env.PORT || 8000

// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));


// // app.get('/chat', (req, res) => {
// //     // Send the HTML file as the response
// //     // res.sendFile(path.join(__dirname, 'index.html'));
// //     res.render('index');
// // });

// // const server = http.createServer((req, res) => {
// //     // Set the response header
// //     res.writeHead(200, {'Content-Type': 'text/plain'});
// // });


// // // const server = app.listen(8000, () => {
// // //     console.log('Application started on port 3000!');
// // // });

// // const socketIo = new Server(server, {
// //     cors: {
// //         origin: '*', // Allow any origin for testing purposes. This should be changed on production.
// //     },
// // });

// // const users = {};

// // socketIo.on('connection', (socket) => {
// //     socket.on('new-user-joined', name => {
// //         // console.log("New user", name)
// //         users[socket.id] = name;
// //         socket.broadcast.emit('user-joined', name);
// //     })

// // socket.on('message', (message) => {
// //     outputMessage(message);

// //     // Scroll down
// //     chatMessages.scrollTop = chatMessages.scrollHeight;
// //   });

// //     socket.on('send', message => {
// //         socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
// //     })
// //     socket.on('connect', message => {
// //         console.log('server connected!')
// //     })
// //     socket.on('disconnect', message => {
// //         socket.broadcast.emit('left', users[socket.id]);
// //         delete users[socket.id];
// //     });
// //     // socket.on('feedback',(data)=>{
// //     //     socket.broadcast.emit('feedback', data)
// //     // })
// // })

// // server.listen(port, () => {
// //     console.log(`Server is running on http://localhost:${port}`);
// // });



// const http = require('http');
// const express = require('express');
// const { Server } = require('socket.io');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 8000;

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(__dirname + '/views'));


// app.get('/', (req, res) => {
//     // Render the EJS file as the response
//     res.render('index');
// });

// // Create the HTTP server using the Express app
// const server = http.createServer(app);

// const socketIo = new Server(server, {
//     cors: {
//         origin: '*', // Allow any origin for testing purposes. This should be changed on production.
//     },
// });

// const users = {};

// socketIo.on('connection', (socket) => {
//     socket.on('new-user-joined', (name) => {
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', (message) => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     });

//     socket.on('disconnect', () => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });





// // ///////////////////////////////////////////////////////////////////////////////////////

// // server.js

// // const io = require('socket.io')(server);

// // // A simple in-memory store for demonstration purposes
// // // You should use a more robust session management system in production
// // // let users = {};

// // io.on('connection', (socket) => {
// //     console.log('New connection:', socket.id);

// //     // Listen for a join event where the client sends their unique ID
// //     socket.on('join', (userId) => {
// //         console.log(`User ${userId} joined with socket ID ${socket.id}`);

// //         // Associate the userId with the socket and store it
// //         users[userId] = socket.id;

// //         // Join a room named after the userId to isolate their communication
// //         socket.join(userId);
// //     });

// //     // Handle receiving a file (or any other data)
// //     socket.on('sendFile', (data) => {
// //         const { userId, fileName, fileData } = data;

// //         // Ensure the user is authorized to send files
// //         if (users[userId] === socket.id) {
// //             // Process the file and save it
// //             const buffer = Buffer.from(fileData);
// //             const fs = require('fs');
// //             fs.writeFile(`uploads/${fileName}`, buffer, (err) => {
// //                 if (err) {
// //                     console.error('Error saving file:', err);
// //                     return;
// //                 }
// //                 console.log('File saved successfully:', fileName);

// //                 // Emit to only this user's room
// //                 io.to(userId).emit('newFile', { fileName });
// //             });
// //         } else {
// //             console.error('Unauthorized attempt to send a file');
// //         }
// //     });

// //     // Handle text messages
// //     socket.on('sendMessage', (data) => {
// //         const { userId, message } = data;

// //         // Ensure the user is authorized to send messages
// //         if (users[userId] === socket.id) {
// //             io.to(userId).emit('message', message); // Emit only to this user's room
// //         } else {
// //             console.error('Unauthorized attempt to send a message');
// //         }
// //     });

// //     // Handle user disconnect
// //     socket.on('disconnect', () => {
// //         console.log('User disconnected:', socket.id);
// //         // Find the user by socket ID and remove from users
// //         const userId = Object.keys(users).find(key => users[key] === socket.id);
// //         if (userId) delete users[userId];
// //     });
// // });




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
