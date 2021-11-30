const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const {dataBaseURL} = require('./DB/config')

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



app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server started'))