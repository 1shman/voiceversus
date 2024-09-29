// const fs = require('fs');
const socket = io();

// TODO: Put appropriate elements here
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const message = document.getElementById('message-input');
const leftSummary = document.getElementById('left-summary');
const rightSummary = document.getElementById('right-summary');

let recorder = null;

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    summarize();
});

// Create summary and send
// Add to UI
async function summarize() {
    const text = message.value;
    socket.emit('message', text);
    message.value = "";
}

// User receives message
socket.on('sent-message', (isOwnMessage, text, summary) => {
    addMessageToUI(isOwnMessage, text);
    addSummaryToUI(isOwnMessage, summary);
});

// Add message to the UI, e.g., a chat message
function addMessageToUI(isOwnMessage, text) {
    // add style based on if it is your message or not
    const element = `
        <li class="${isOwnMessage ? "messageRight" : "messageLeft"}">
            <p class="message">
            ${text}
            </p>
        </li>
        `;
    messageContainer.innerHTML += element;
    scrollToBottom();
}

function addSummaryToUI(isOwnMessage, summary) {
    console.log(summary);
    if (isOwnMessage) {
        rightSummary.innerText = summary;
    } else {
        leftSummary.innerText = summary;
    }
}

// When a message is put in, users automatically scroll to the bottom
function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

// function getAudioFile() {
//     return new Promise(function (resolve) {
//         navigator.mediaDevices.getUserMedia({
//             audio: true
//         })
//             .then((stream) => {
//                 const mediaRecorder = new MediaRecorder(stream);
//                 const audioChunks = [];

//                 mediaRecorder.addEventListener("dataavailable", (e) => {
//                     audioChunks.push(event.data);
//                 });

//                 const start = function() {

//                 }

//                 const stop = function() {
//                     return new Promise(function (resolve) {

//                     });
//                 }


//             });
//     });
// }

// async function recordAudio() {
//     console.log("Record");
//     navigator.permissions.query({name: 'microphone'})
//         .then((permissionObj) => {
//             console.log(permissionObj.state);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
    
//     recorder = await(getAudioFile);

// }