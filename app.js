const express = require('express');

const http = require('http');

const socketIo = require('socket.io');

const cors = require('cors');

const {
    formatMessage
} = require('./utils/messages')

const {
    getAllUsers,
    getUser,
    addUser
} = require('./utils/users')



const app = express();

const server = http.createServer(app);

const io  = socketIo(server, {cors: { origin: "*"}});

const port = 5000 || process.env.PORT;




io.on('connection', (socket) => {
    console.log(socket.id);


    // get|save|update current user
    socket.on('getCurrentUser', username => {
        user = addUser(socket.id, username)
    })

    socket.emit('getUsers', getAllUsers())
    
    // JOIN ROOM
    socket.on('joinRoom', roomName => {
        socket.join(roomName)

        console.log(roomName)
        socket.on('chatMessage', ({inputMessage, username, recv}) => {
            socket.broadcast.to(room).emit('message', formatMessage(username, recv, inputMessage, room))
        })
    })
    
    // respond to ChatMessage

    io.on('disconnect', (msg) => io.emit('message', `${msg.id} has disconnected`))
})

server.listen(port, () => console.log(`server started at port: ${port}`))

