// const http = require('http');
// const express = require('express');
// const {Server} = require('socket.io');
// const fs = require('fs');
// const path = require('path')

// const app = express();
// const port = process.env.PORT || 8000

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// app.get('/chat', (req, res) => {
//     // Send the HTML file as the response
//     // res.sendFile(path.join(__dirname, 'index.html'));
//     res.render('index');
// });

// const server = http.createServer((req, res) => {
//     // Set the response header
//     res.writeHead(200, {'Content-Type': 'text/plain'});
// });
 

// // const server = app.listen(8000, () => {
// //     console.log('Application started on port 3000!');
// // });

// const socketIo = new Server(server, {
//     cors: {
//         origin: '*', // Allow any origin for testing purposes. This should be changed on production.
//     },
// });

// const users = {};

// socketIo.on('connection', (socket) => {
//     socket.on('new-user-joined', name => {
//         // console.log("New user", name)
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     })
    
// socket.on('message', (message) => {
//     outputMessage(message);
  
//     // Scroll down
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   });

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
//     })
//     socket.on('connect', message => {
//         console.log('server connected!')
//     })
//     socket.on('disconnect', message => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
//     // socket.on('feedback',(data)=>{
//     //     socket.broadcast.emit('feedback', data)
//     // })
// })

// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



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


app.get('/', (req, res) => {
    // Render the EJS file as the response
    res.render('index');
});

// Create the HTTP server using the Express app
const server = http.createServer(app);

const socketIo = new Server(server, {
    cors: {
        origin: '*', // Allow any origin for testing purposes. This should be changed on production.
    },
});

const users = {};

socketIo.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
