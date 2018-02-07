const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { PORT, rootPath } = require('../config/config');
const { constructMessage, constructLocation } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(rootPath, "public");

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // Returns the WebSocketServer. We can now emmit and listen to events through io

const users = new Users(); // returns an empty array of users

io.on('connection', socket => {
    console.log("New user connected");

    /**
     * socket.emit emits to the single connection
     */
    // socket.emit for Welcome Message to the Joinee
    // socket.emit("newMessage", constructMessage("Admin", `Welcome to the Node Chat App`));


    /**
     * socket.broadcast emits to everyone but originator
     */
    // socket.broadcast.emit to intimate everyone else that a new user has joined
    // socket.broadcast.emit("newMessage", constructMessage("Admin", `New user has joined the group`));


    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required");
        }

        /**
         * socket.join lets you join in a specific room to chat in. To leave the group, simply do socket.leave("Room Name");
         */
        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", constructMessage("Admin", `Welcome to the Node Chat App`));

        // Broadcasting to the users of a specific room
        socket.broadcast.to(params.room).emit("newMessage", constructMessage("Admin", `${params.name} has joined the room`));


        callback();
    });


    socket.on("createMessage", function (msgData, callback) {
        const user = users.getUser(socket.id);

        if (user && isRealString(msgData.text)) {

            /**
             * io.emit emits to every single connection
             */
            io.to(user.room).emit("newMessage", constructMessage(user.name, msgData.text));
        }

        callback();
    });

    socket.on("sendLocation", (coords) => {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit("newLocation", constructLocation(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", constructMessage("Admin", `${user.name} has left the room`));
        }
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
