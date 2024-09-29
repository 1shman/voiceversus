require('dotenv').config();
const { Console } = require('console');
const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

const groq = new Groq({ apiKey: process.env.GROQ_SECRET_KEY });

const prevSummaries = new Map();
var summary;

app.use(express.static(path.join(__dirname, 'views')));

io.on('connection', (socket) => {
    console.log("connection");
    socket.on('message', async function(text) {
        await summarizer(socket.id, text);
        prevSummaries.set(socket.id, summary);
        socket.emit('sent-message', true, text, summary);
        socket.broadcast.emit('sent-message', false, text, summary);
    });
});

async function summarizer(id, text) {
    var content;
    if (prevSummaries.has(id)) {
        content = `Previous summary: '${prevSummaries.get(id)}'. Create bullet points (use a -) of important facts or opinions included in the text. Add onto previous bullet points. Text to be summarized: '${text}'`
    } else {
        content = `This person is making an argument in a debate. Create bullet points of important facts or opinions included in their argument. Text to be summarized: '${text}'`
    }
    const summarizer = await groq.chat.completions
        .create({
            messages: [
                {
                    role: "user",
                    content: content,
                },
            ],
            model: "mixtral-8x7b-32768",
        })
        .then((chatCompletion) => {
            summary = chatCompletion.choices[0]?.message?.content || "";
            console.log(summary);
        });
}