require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const getPageContent = require('./service/scraper/puppeteer');
const updateData = require('./service/update-service')


const apiRouter = require('./routes/apiRouter');
const homeRouter = require('./routes/homeRouter');
const card = require('./models/card');
const serverSettings = require('./models/serverSettings');
const authRouter = require('./routes/authRouter');


const app = express();

app.use(cookieParser());
app.use(express.static(__dirname + '/client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;


mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
})
  .then(() => {
    console.log('Connected to mongoDB');
    app.listen(port, () => console.log(`server started on PORT:${port}`));
    mainCycle();
    setInterval(() => mainCycle(), 60000);
  });


let SITE = 'https://della.com.ua/search';
let ids = ['9221312153642559334'];

async function mainCycle() {
  try {
    let setup = await serverSettings.find({ _id: '61a9e5936978c794bb685d4b' });
    //await card.deleteMany({}) // Костиль для видалення всіх заявок
    if (setup[0].scraping === true) {
      let data = await getPageContent(SITE, ids)// url, arr
      for (let i = 0; i < data.length; i++) {
        let test = new card(data[i])
        test.save((err, info) => {
          //if (err) { console.log('err') }
        })
      }
    }
    updateData();
  } catch (error) {
    console.log(error)
  }
}