const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
const dataBaseURL = require('./config');
const getPageContent = require('./scraper/puppeteer');


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
            mainCycle();
            setInterval(() => mainCycle(), 60000);
        });


let SITE = 'https://della.com.ua/search';
let ids = ['9221312153642559334'];

async function mainCycle(){
  let setup = await serverSettings.find({ _id: '61a9e5936978c794bb685d4b' });
  //await card.deleteMany({})
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
  let data = await card.find({closed: false});
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
        let response1 = await card.updateOne({ idDella: currentCard.idDella }, currentCard )
        if (response1.modifiedCount > 0) {
          await card.updateOne({ idDella: arr2[k] }, { needToUpdate: true })
          console.log('card updated: ' + arr2[k])
        }
      } else { //карти нема на Деллі
        await card.updateOne({ idDella: arr2[k] }, { closed: true, needToUpdate: true });
        
        console.log('Deleted, mark as closed ' + arr2[k])
      }
    }
  }
}
testPush()
async function testPush() {
  let data = await card.find({ agreedPub: true });
  if (data[0]) {
    addCargo(data[0], 'add');
  }
  
}

async function addCargo(targetCard, type) {
  let data = {}
  setData();
  function setData() {
    setCarType(targetCard.bodyTypeId);
    data.dateFrom = targetCard.dateFrom;
    data.contentName = targetCard.contentName;
    data.waypointListSource = targetCard.waypointListSource;
    data.waypointListTarget = targetCard.waypointListTarget;
    if (targetCard.dateTo) { data.dateTo = targetCard.dateTo };
    if (targetCard.sizeMassTo) { data.sizeMassTo = targetCard.sizeMassTo };
    if (targetCard.sizeMassFrom) { data.sizeMassFrom = targetCard.sizeMassFrom };
    if (targetCard.sizeVolumeTo) { data.sizeVolumeTo = targetCard.sizeVolumeTo };
    if (targetCard.sizeVolumeFrom) { data.sizeVolumeFrom = targetCard.sizeVolumeFrom };
    if (targetCard.paymentPrice) { data.paymentPrice = targetCard.paymentPrice };
    if (targetCard.paymentCurrencyId) { data.paymentCurrencyId = targetCard.paymentCurrencyId };

    if (targetCard.note) { data.note = targetCard.note.substring(0,40);}

    if (targetCard.loadTypes) {
      data.loadTypes = [];
      if (targetCard.loadTypes.includes('Зверху')) {
        data.loadTypes.push(24)
      }
      if (targetCard.loadTypes.includes('Збоку')) {
        data.loadTypes.push(25)
      }
      if (targetCard.loadTypes.includes('Задня')) {
        data.loadTypes.push(26)
      }
    }

    if (targetCard.payment) {
      if (targetCard.payment.includes('При розвантаженні')) {
        data.paymentMomentId = '4';
      } else if (targetCard.payment.includes('При завантаженні')) {
        data.paymentMomentId = '2';
      }

      if (targetCard.payment.includes('На картку')) {
        data.paymentTypeId = '10';
      } else if (targetCard.payment.includes('Б/г')) {
        data.paymentTypeId = '4';
      } else if (targetCard.payment.includes('Готівка')) {
        data.paymentTypeId = '2';
      } else if (targetCard.payment.includes('Софт')) {
        data.paymentTypeId = '10';
      } 
    }
  }
  function setCarType(carType, ) {
    let carTypes = {
      'тент': '34',
      'рефрижератор': '32',
      'тагач': '70',
      'ізотерм': '25',
      'цільнометал.': '36',
      'автовоз': '20',
      'бортова': '63',
      'зерновоз': '26',
      'контейнеровіз': '28',
      'лісовоз': '42',
      'негабарит': '30',
      'платформа': '64',
      'самоскид': '33',
      'трал': '30',
      'мікроавтобус': '57',
      'контейнер пустий': '27',
      'металовіз (ломовіз)': '69',
    }
    switch (carType) {
      case 'будь-яка':
        data.bodyGroupId = '1';
        break;
      case 'крита':
        data.bodyGroupId = '1';
        break;
      case 'відкрита':
        data.bodyGroupId = '2';
        break;
      default:
        for (let key in carTypes) {
          if (key === carType) {
            data.bodyTypeId = carTypes[key];
            break;
          }
        }
    }
  }
  
  let headers = {
    "Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : "2G30T38OTS7000002145" //Натаха 2KMC4KLY6L5000002157         2G30T38OTS7000002145
  }

  switch (type) {
    case 'add':
      await axios.post('https://api.lardi-trans.com/v2/proposals/my/add/cargo', JSON.stringify(data), { headers } )
      .then(res => card.updateOne({ idDella: targetCard.idDella }, { idLardi: res.data.id }))
      .catch(error => console.log(error.response.data))
      //console.log(result.data.id)
      //let resp = await card.updateOne({ idDella: targetCard.idDella }, { idLardi: result.data.id })
      break;
    case 'change':
      axios.put('https://api.lardi-trans.com/v2/proposals/my/cargo/published' + targetCard.idLardi)
      break;
    case 'delete':
      axios.post('https://api.lardi-trans.com/v2/proposals/my/basket/throw', JSON.stringify({cargoIds: [targetCard.idLardi]}))
      break;
  }
}