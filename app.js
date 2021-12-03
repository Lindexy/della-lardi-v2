const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dataBaseURL = require('./config');
const card = require('./models/card');
const {serverSettings} = require('./models/server')

const apiRouter = require('./routes/apiRouter');
const homeRouter = require('./routes/homeRouter');


const app = express();
// робимо папку 'client' статичною
app.use(express.static(path.resolve(__dirname, 'client')));

app.use('/', homeRouter)
app.use('/api', apiRouter)




// testing request from client
app.get('/api/on', async (req, res) => {
    console.log(req.query)
    //let data = await serverSettings.updateOne({ _id: '61a9e5936978c794bb685d4b'}, {scraping: false})
})





/* app.get('/api/cards', async (req, res) => {
    let data = await card.find({})
    res.status(200).json(data)
}) */



/* app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
}) */



mongoose.connect(dataBaseURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true,
        })
        .then(() => {
            console.log('Connected to mongoDB');
            app.listen(3000, () => console.log('server started'))
        });










/* let test = {
    scraping: true
}
let create = serverSettings(test)

create.save((err, user) => {
    if (err) {
      console.log('err', err)
    }
    console.log('saved user', user)
  }) */