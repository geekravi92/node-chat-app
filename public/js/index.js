(function () {
    const socket = io();

    socket.on("connect", () => {
        console.log("Connected to the Server");
    });

    socket.on("newMessage", (newMsg) => {
        console.log(newMsg);
        const li = `<li>${newMsg.from}: ${newMsg.text}</li>`;
        document.querySelector("#messages").insertAdjacentHTML("beforeend", li);
    });

    socket.on("disconnect", () => console.log("Disconnected from the server"));



    /**
     * DOM Manipulation
     */
    document.querySelector("#chat-box").addEventListener("submit", (event) => {
        event.preventDefault();
        socket.emit(
            "createMessage",
            {
                from: "Arvind Jaiswal",
                text: document.querySelector("[name=message]").value
            },
            () => console.log("Acknowledgement Recieved: Got it")
        )
    });

})()

