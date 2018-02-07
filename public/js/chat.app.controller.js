/**
 * App Controller
 */
const AppController = (function (UICtrl, socket) {
    function Chat(from, text) {
        this.from = from;
        this.text = text;
    }

    /**
     * Get Query Parameters as Object (Deparameterize)
     */
    // function deparamUri(uriParam) {
    //     let uri = uriParam, queryString = {};

    //     if (uri === undefined) {
    //         uri = window.location.search;
    //     }

    //     uri.split("?").pop().split("&").forEach(function (prop) {
    //         var item = prop.split("=");
    //         queryString[item.shift()] = item.shift();
    //     });
    //     return queryString;
    // }
    function deparamUri(uriParam) {
        let uri = uriParam, queryString = {};

        if (uri === undefined) {
            uri = window.location.search;
        }

        uri.replace(
            new RegExp(
                "([^?=&]+)(=([^&#]*))?", "g"),
            function ($0, $1, $2, $3) {
                if ($3)
                    queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
            }
        );
        return queryString;
    }


    function setUpSocketListeners() {

        // Listening to connection
        socket.on("connect", () => {
            const queryParams = deparamUri(window.location.search);

            // Joining a room
            socket.emit("join", queryParams, (err) => {
                if (err) {
                    alert(err);
                    window.location.href = "/";
                } else {
                    console.log("No error");
                }
            });
        });

        // Listening to disconnection
        socket.on("disconnect", () => console.log("Disconnected from the server"));


        // Listening to updateUserList event
        socket.on("updateUserList", (users) => {
            console.log(users);
            UICtrl.updateUserList(users);
        });

        // Listening to incoming messages
        socket.on("newMessage", (newMsg) => {
            console.log(newMsg);
            UICtrl.setNewMessage(newMsg.from, newMsg.text, newMsg.createdOn);
        });

        // Listening to incoming location message
        socket.on("newLocation", (newLocation) => {
            console.log(newLocation);
            UICtrl.setNewLocation(newLocation.from, newLocation.url, newLocation.createdOn);
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
