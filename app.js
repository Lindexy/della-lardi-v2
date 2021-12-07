const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dataBaseURL = require('./config');

const apiRouter = require('./routes/apiRouter');
const homeRouter = require('./routes/homeRouter');


const app = express();
// робимо папку 'client' статичною
app.use(express.static(path.resolve(__dirname, 'client')));


app.use('/', homeRouter)
app.use('/api', apiRouter)


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