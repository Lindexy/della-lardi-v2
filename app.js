require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
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
  let setup = await serverSettings.find({ _id: '61a9e5936978c794bb685d4b' });
  //await card.deleteMany({}) // Костиль для видалення всіх заявок
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
  updateData();
  testPush();
  deleteClosedCards();
}

async function testPush() {
  let res = await card.find({ needToUpdate: true });
  for (let i = 0; i < res.length; i++) {

    if (!res[i].published && res[i].agreedPub) {
      //console.log(res[i].published)
      addCargo(res[i], 'add')
    }
    if (res[i].published && res[i].agreedPub) {
      addCargo(res[i], 'change')
    }
  }
}

async function deleteClosedCards() {
  let res = await card.find({ published: true }); //всі закриті і закинуті заявки
  for (let i = 0; i < res.length; i++) {
    if (res[i].closed || !res[i].agreedPub) {
      addCargo(res[i], 'delete')
    }


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
    if (targetCard.dateTo) { data.dateTo = targetCard.dateTo }
    if (targetCard.sizeMassTo) { data.sizeMassTo = targetCard.sizeMassTo }
    if (targetCard.sizeMassFrom) { data.sizeMassFrom = targetCard.sizeMassFrom }
    if (targetCard.sizeVolumeTo) { data.sizeVolumeTo = targetCard.sizeVolumeTo }
    if (targetCard.sizeVolumeFrom) { data.sizeVolumeFrom = targetCard.sizeVolumeFrom }
    if (targetCard.paymentPrice) { data.paymentPrice = targetCard.paymentPrice }
    if (targetCard.paymentCurrencyId) { data.paymentCurrencyId = targetCard.paymentCurrencyId }

    if (targetCard.note) { data.note = targetCard.note.substring(0, 40); }

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
  function setCarType(carType,) {
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
      'щеповіз': '26',
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
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "2G30T38OTS7000002145" //Натаха 2KMC4KLY6L5000002157         2G30T38OTS7000002145
  }

  switch (type) {
    case 'add':
      let result = await axios.post('https://api.lardi-trans.com/v2/proposals/my/add/cargo', JSON.stringify(data), { headers })
        .then(result => card.updateOne({ idDella: targetCard.idDella }, { needToUpdate: false, published: true, idLardi: result.data.id }))
        .catch(res => console.log(res.response.data))
      break;
    case 'change':
      console.log('try to update card...');
      axios.put('https://api.lardi-trans.com/v2/proposals/my/cargo/published/' + targetCard.idLardi, JSON.stringify(data), { headers })
        .then(res => card.updateOne({ idDella: targetCard.idDella }, { needToUpdate: false }))
        .catch(res => console.log(res.response.data))
      break;
    case 'delete':
      axios.post('https://api.lardi-trans.com/v2/proposals/my/basket/throw', JSON.stringify({ cargoIds: [targetCard.idLardi] }), { headers })
        .then(res => card.updateOne({ idDella: targetCard.idDella }, { needToUpdate: false, published: false, idLardi: '' }))
        .catch(res => console.log(res.response.data))
  }
}