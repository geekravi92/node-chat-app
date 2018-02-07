/**
 * App Controller
 */
const AppController = (function (UICtrl, socket) {
    function Chat(from, text) {
        this.from = from;
        this.text = text;
    }

    function formatChatTime(timestamp) {
        return moment(timestamp).format("h:mm a");
    }

    function setUpSocketListeners() {

        // Listening to connection
        socket.on("connect", () => console.log("Connected to the Server"));

        // Listening to disconnection
        socket.on("disconnect", () => console.log("Disconnected from the server"));

        // Listening to incoming messages
        socket.on("newMessage", (newMsg) => {
            console.log(newMsg);
            UICtrl.setNewMessage(`${newMsg.from} ${formatChatTime(newMsg.createdOn)}`, newMsg.text)
        });

        // Listening to incoming location message
        socket.on("newLocation", (newLocation) => {
            console.log(newLocation);
            UICtrl.setNewLocation(`${newLocation.from} ${formatChatTime(newLocation.createdOn)}`, newLocation.url);
        });
    }

    function setUpDOMEventListeners() {
        const DOM = UICtrl.getDOMStrings();

        // DOM Events
        document.querySelector(DOM.chatBox).addEventListener("submit", (event) => {
            event.preventDefault();
            const userInput = UICtrl.getCreatedMessage();
            const newChat = new Chat(userInput.from, userInput.text);
            socket.emit("createMessage", newChat, () => {
                console.log("Acknowledgement Recieved: Got it")
                UICtrl.clearInputs();
            });
        });

        const locationButton = document.querySelector(DOM.sendLocation);
        locationButton.addEventListener("click", (e) => {
            if (!navigator.geolocation) {
                return alert("Geolocation not supported by your browser");
            }
            locationButton.disabled = true;
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    locationButton.disabled = false;
                    socket.emit(
                        "sendLocation",
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    )
                },
                (error) => {
                    locationButton.disabled = false;
                    alert("Unable to fetch location");
                }
            )
        });
    }


    return {
        init() {
            setUpSocketListeners();
            setUpDOMEventListeners();
        }
    }
})(UIController, io());

AppController.init();
