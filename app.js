const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dataBaseURL = require('./config');
const getPageContent = require('./scraper/puppeteer')

const apiRouter = require('./routes/apiRouter');
const homeRouter = require('./routes/homeRouter');
const card = require('./models/card');
const serverSettings = require('./models/serverSettings');
const res = require('express/lib/response');


const app = express();
// робимо папку 'client' статичною
app.use(express.static(path.resolve(__dirname, 'client')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter)
app.use('/api', apiRouter)

const port = process.env.PORT || 3000;


mongoose.connect(dataBaseURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true,
        })
        .then(() => {
            console.log('Connected to mongoDB');
            app.listen(port, () => console.log('server started'));
            setInterval(() => mainCycle(), 30000)
            
        });

let SITE = 'https://della.com.ua/search';
let ids = ['9221312153642559334'];

async function mainCycle(){
  let setup = await serverSettings.find({ _id: '61a9e5936978c794bb685d4b' });

  //await card.deleteMany({})
  //console.log(setup);
  if (setup[0].scraping === true) {
    console.log('scraping on');
    let data = await getPageContent(SITE, ids)// url, arr
    for (let i = 0; i < data.length; i++) {
      let test = new card(data[i])
      test.save((err, info) => {
          //if (err) { console.log('err') }
        })
    }
  }

  updateData()
}
// актуалізація данних
// получаємо всі карти з БД
// відправляємо на перевірку по 200 штук
// після того як перевірили всі чекаємо мінуту, поченаємо заново


async function updateData() {
  console.log('updating...')
  let data = await card.find({});
  for (let i = 0; i < data.length / 200; i++) {
    let arr =  data.slice(i * 200, (i * 200) + 200);
    let arr2 = [];
    for (let j = 0; j < arr.length; j++) {
      arr2.push(arr[j].idDella)
    }
    url = 'https://della.com.ua/my/selected/';
    let result = await getPageContent(url, arr2);
    for (let k = 0; k < arr2.length; k++) {
      let currentCard = result.find(item => item.idDella === arr2[k]);
      
      if (currentCard !== undefined) { // карта є на Деллі
        // перевіряємо чи є зміни
        



        let response1 = await card.updateOne({ idDella: currentCard.idDella }, currentCard )
        //console.log(response1)
        /* if (response1.acknowledged !== false) {
          console.log('updated: ' + currentCard)
        }  */
       
      } else { //карти нема на Деллі
        await card.deleteOne({ idDella: arr2[k] })
        console.log('Карту видале з БД так як її нема на Делл ' + arr2[k])
      }



      
    }
  }

}


//check()
async function check() {
  // перевіряємо чи є така карта на делі - якщо нема вказуємо це БД
  // перевіріяємо чи заказ на делі співпадає з БД
  // якщо да змінюємо дату оновлення
  // якщо ні оновлюємо запис в ДБ
  url = 'https://della.com.ua/my/selected/';
  id = ['9221346091603037730', '9221345172244194423', '21342100958994001'];
  let data = await getPageContent(url, id)
  console.log(data)
}

async function foo() {
  let data = await card.updateOne({ idDella: '21347184034508797'}, { contentName: '123'})
  //console.log(data)
}
foo()