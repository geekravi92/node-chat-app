const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { PORT } = require('../config/config');
const publicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // Returns the WebSocketServer. We can now emmit and listen to events through socket

io.on('connection', socket => {
    console.log("New user connected");

    socket.on("createMessage", (msgData) => {
        console.log(msgData);
        socket.emit("newMessage", msgData);
    });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
