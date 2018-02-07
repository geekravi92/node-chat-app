const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { PORT, rootPath } = require('../config/config');
const { constructMessage, constructLocation } = require('./utils/message');
const publicPath = path.join(rootPath, "public");

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // Returns the WebSocketServer. We can now emmit and listen to events through io

io.on('connection', socket => {
    console.log("New user connected");

    /**
     * Chat App Functionalities
     */


    /**
     * socket.emit emits to the single connection
     */
    // socket.emit for Welcome Message to the Joinee
    socket.emit("newMessage", constructMessage("Admin", `Welcome to the Node Chat App`));


    /**
     * socket.broadcast emits to everyone but originator
     */
    // socket.broadcast to intimate everyone else that a new user has joined
    socket.broadcast.emit("newMessage", constructMessage("Admin", `New user has joined the group`));
    //    

    socket.on("createMessage", function (msgData, callback) {
        console.log(msgData);

        /**
         * io.emit emits to every single connection
         */
        io.emit("newMessage", constructMessage(msgData.from, msgData.text));
        callback();
    });

    socket.on("sendLocation", (coords) => {
        io.emit("newLocation", constructLocation("Admin", coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
