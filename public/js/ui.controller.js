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
        clearInput: ".clear"
    };

    function insertMessageToChat(html) {
        document.querySelector(DOMStrings.messages).insertAdjacentHTML("beforeend", html);
    }

    function formatChatTime(timestamp) {
        return moment(timestamp).format("h:mm a");
    }

    return {
        getDOMStrings() {
            return DOMStrings;
        },

        setNewMessage(from, text, createdOn) {
            let template = document.querySelector(DOMStrings.messageTemplate).innerHTML;
            template = Mustache.render(template, { from, text, createdOn: formatChatTime(createdOn) });
            insertMessageToChat(template);
        },

        setNewLocation(from, url, createdOn) {
            let template = document.querySelector(DOMStrings.locationMessageTemplate).innerHTML;
            template = Mustache.render(template, { from, url, createdOn: formatChatTime(createdOn) });
            insertMessageToChat(template);

        },

        getCreatedMessage() {
            return {
                from: "Arvind Jaiswal",
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