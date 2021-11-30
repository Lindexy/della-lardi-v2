const express = require('express')
const {getPageContent} = require('./puppeteer');
const mongoose = require('mongoose');
const {card} = require('../DB/card');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose
    .connect('mongodb+srv://qwerty:@della-lardi.xs36u.mongodb.net/Della?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(() => {
        console.log('Connected to mongoDB');
        //start();
    });

let SITE = 'https://della.com.ua/search';
let ids = ['9221312153642559334'];

async function start(){
    let data = await getPageContent(SITE, ids)// url, arr
    for (let i = 0; i < data.length; i++) {
        let test = new card(data[i])
        test.save((err, info) => {
            if (err) {
              console.log('err', err)
            }
            console.log('saved info', info)
          })
    }
}





