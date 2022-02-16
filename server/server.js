const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
})

io.on('connection', (socket) => {
    console.log("Socket ID: ", socket.id);
    // console.log(socket.handshake.auth);

    socket.on('send-message', (message, roomId) => {
        console.log(message, roomId);

        if(roomId == '') {
            socket.broadcast.emit('receive-message', message);
        }
        else {
            socket.to(roomId).emit('receive-message', message);
        }
    })

    socket.on('join-room', (room) => {
        socket.join(room);
    })
})

// client - server  -> Continous -> Socket 
// IRC - Internet relay chat

// Room - socket id