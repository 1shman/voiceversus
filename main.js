require('dotenv').config();
const { Console } = require('console');
const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

const groq = new Groq({ apiKey: process.env.GROQ_SECRET_KEY });
var summary;

app.use(express.static(path.join(__dirname, 'views')));

io.on('connection', (socket) => {
    console.log("connection");
    socket.on('message', async function(text) {
        await summarizer(text);
        socket.emit('sent-message', true, text, summary);
        socket.broadcast.emit('sent-message', false, text, summary);
    });
});

async function summarizer(text) {
    const summarizer = await groq.chat.completions
        .create({
            messages: [
                {
                    role: "user",
                    content: `Summarize the following text in less than 100 words: ${text}`,
                },
            ],
            model: "mixtral-8x7b-32768",
        })
        .then((chatCompletion) => {
            summary = chatCompletion.choices[0]?.message?.content || "";
            console.log(summary);
        });
}