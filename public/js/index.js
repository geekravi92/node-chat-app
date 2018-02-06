const socket = io();

socket.on("connect", () => {
    socket.emit("createMessage", {
        from: "Arvind",
        text: "Hey, this text is sent by Arvind Jaiswal"
    });
});

socket.on("newMessage", (newMsg) => {
    console.log(newMsg);
});

socket.on("disconnect", () => console.log("Disconnected from the server"));


