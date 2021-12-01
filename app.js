const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const {dataBaseURL} = require('./DB/config');
const {card} = require('./DB/card');

mongoose
    .connect(dataBaseURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(() => {
        console.log('Connected to mongoDB');
        //start();
    });


async function start() {
    let data = await card.find({});
    console.log(data);
}







app.get('/api/cards', async (req, res) => {
    let data = await card.find({})
    res.status(200).json(data)
})

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server started'))