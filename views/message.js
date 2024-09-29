// const fs = require('fs');
// const Groq = require('groq-sdk');

const socket = io();
// const groq = new Groq();

// TODO: Put appropriate elements here
const messageContainer = document.getElementById('message-container');
const audioForm = document.getElementById('audio-form');
const audioPath = document.getElementById('message-input');


audioForm.addEventListener('submit', (e) => {
    e.preventDefault();
    transcribe();
});

// Get the transcript from the audio file at audioPath
// then emit to main.js
// Add to UI
async function transcribe() {
    // const transcript = await groq.audio.transcriptions.create({
    //     file: fs.createReadStream(audioPath.value),
    //     model: "distil-whisper-large-v3-en",
    //     response_format: "text"
    // });
    const transcript = audioPath.value;
    socket.emit('transcript', transcript);
    addMessageToUI(true, transcript);
    audioPath.value = "";
}

// User receives a message
socket.on('sent-transcript', (transcript) => {
    addMessageToUI(false, transcript);
});

// Add message to the UI, e.g., a chat message
function addMessageToUI(isOwnMessage, transcript) {
    // add style based on if it is your message or not
    const element = `
        <li class="${isOwnMessage ? "messageRight" : "messageLeft"}">
            <p class="message">
            ${transcript}
            </p>
        </li>
        `;
    messageContainer.innerHTML += element;
    scrollToBottom();
}

// When a message is put in, users automatically scroll to the bottom
function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}