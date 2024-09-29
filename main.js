const express = require('express');
const path = require('path');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'views')));

io.on('connection', (socket) => {
    console.log("connection");
    socket.on('transcript', (transcript) => {
        socket.broadcast.emit('sent-transcript', transcript);
    });
});