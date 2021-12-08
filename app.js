const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dataBaseURL = require('./config');
const getPageContent = require('./scraper/puppeteer')

const apiRouter = require('./routes/apiRouter');
const homeRouter = require('./routes/homeRouter');
const card = require('./models/card');
const serverSettings = require('./models/serverSettings')


const app = express();
// робимо папку 'client' статичною
app.use(express.static(path.resolve(__dirname, 'client')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter)
app.use('/api', apiRouter)


mongoose.connect(dataBaseURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true,
        })
        .then(() => {
            console.log('Connected to mongoDB');
            app.listen(3000, () => console.log('server started'));
            mainCycle();
        });

let SITE = 'https://della.com.ua/search';
let ids = ['9221312153642559334'];

async function mainCycle(){
  let setup = await serverSettings.find({ _id: '61a9e5936978c794bb685d4b' });
  //console.log(setup);
  if (setup[0].scraping === true) {
    console.log('scraping on');
    let data = await getPageContent(SITE, ids)// url, arr
    for (let i = 0; i < data.length; i++) {
      let test = new card(data[i])
      test.save((err, info) => {
          if (err) { console.log('err', err) }
        })
    }
  }

  
}








/* let create = serverSettings(test)

create.save((err, user) => {
    if (err) {
      console.log('err', err)
    }
    console.log('saved user', user)
  }) */