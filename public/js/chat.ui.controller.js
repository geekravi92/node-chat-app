/**
 * UI Controller
 */

const UIController = (function () {
    const DOMStrings = {
        messages: "#messages",
        message: "#message",
        chatBox: "#chat-box",
        sendLocation: "#send-location",
        inputName: "[name=message]",
        messageTemplate: "#message-template",
        locationMessageTemplate: "#location-message-template",
        users: "#users",
        clearInput: ".clear"
    };

    function insertMessageToChat(html) {
        document.querySelector(DOMStrings.messages).insertAdjacentHTML("beforeend", html);
    }

    function formatChatTime(timestamp) {
        return moment(timestamp).format("h:mm a");
    }

    function scrollToBottom() {
        // Selectors
        const messages = document.querySelector(DOMStrings.messages);
        const newMessage = messages.lastElementChild;
        const lastMessage = newMessage.previousElementSibling;

        // Heights
        let clientHeight = messages.clientHeight;
        let scrollTop = messages.scrollTop;
        let scrollHeight = messages.scrollHeight;
        let newMessageHeight = newMessage !== null ? window.getComputedStyle(newMessage, null).getPropertyValue("height") : 0;
        let lastMessageHeight = lastMessage !== null ? window.getComputedStyle(lastMessage, null).getPropertyValue("height") : 0;

        newMessageHeight = parseInt(newMessageHeight.toString().split("px")[0]);
        lastMessageHeight = parseInt(lastMessageHeight.toString().split("px")[0]);

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop = scrollHeight;
        }
    }

    return {
        getDOMStrings() {
            return DOMStrings;
        },

        updateUserList(usernames) {
            let ol = `<ol>`;

            usernames.forEach(username => {
                ol += `<li>${username}</li>`;
            });
            ol = ol + `</ol>`;
            document.querySelector(DOMStrings.users).innerHTML = ol;
        },

        setNewMessage(from, text, createdOn) {
            let template = document.querySelector(DOMStrings.messageTemplate).innerHTML;
            template = Mustache.render(template, { from, text, createdOn: formatChatTime(createdOn) });
            insertMessageToChat(template);
            scrollToBottom();
        },

        setNewLocation(from, url, createdOn) {
            let template = document.querySelector(DOMStrings.locationMessageTemplate).innerHTML;
            template = Mustache.render(template, { from, url, createdOn: formatChatTime(createdOn) });
            insertMessageToChat(template);
            scrollToBottom()

        },

        getCreatedMessage() {
            return {
                text: document.querySelector(DOMStrings.inputName).value
            }
        },

        clearInputs() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.clearInput);

            fieldsArray = [].slice.call(fields);
            fieldsArray.forEach((current, index, arrray) => {
                current.value = "";
            });
            fields[0].focus();
        }
    }
})()