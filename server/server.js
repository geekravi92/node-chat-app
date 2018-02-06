const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { PORT, rootPath } = require('../config/config');
const publicPath = path.join(rootPath, "public");

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // Returns the WebSocketServer. We can now emmit and listen to events through io

io.on('connection', socket => {
    console.log("New user connected");

    socket.on("createMessage", (msgData) => {
        console.log(msgData);

        /**
         * socket.emit emits to the single connection
         */
        // socket.emit("newMessage", msgData);


        /**
         * io.emit emits to every single connection
         */
        // io.emit("newMessage", {
        //     from: msgData.from,
        //     text: msgData.text,
        //     createdAt: new Date().getTime()
        // });

        /**
         * socket.broadcast emits to everyone but originator
         */
        // socket.broadcast.emit("newMessage", {
        //     from: msgData.from,
        //     text: msgData.text,
        //     createdAt: new Date().getTime()
        // });




        /**
         * Chat App Functionalities
         */

        // socket.emit for Welcome Message to the Joinee
        socket.emit("newMessage", {
            from: "Admin",
            text: `Welcome to the Node Chat App, ${msgData.from}`
        });

        // socket.broadcast to intimate everyone else that a new user has joined
        socket.broadcast.emit("newMessage", {
            from: "Admin",
            text: `${msgData.from} has joined the group`,
            createdAt: new Date().getTime()
        });
        //      
    });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
