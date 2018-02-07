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
        clearInput: ".clear"
    };

    function insertMessageToChat(html) {
        document.querySelector(DOMStrings.messages).insertAdjacentHTML("beforeend", html);
    }

    return {
        getDOMStrings() {
            return DOMStrings;
        },

        setNewMessage(from, text) {
            const li = `<li>${from}: ${text}</li>`;
            insertMessageToChat(li);
        },

        setNewLocation(from, url) {
            const li = `<li><a target=_blank href="${url}">Location of ${from}</a></li>`;
            insertMessageToChat(li);
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