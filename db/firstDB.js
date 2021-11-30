let mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
  idDella: {type: String, required: true, unique: true},
  bodyTypeId: String,
  contentName: String,
  dateFrom: String,
  dateTo: String,
  loadTypes: [],
  note: String,
  paymentCurrencyId: String,
  paymentMomentId: String,
  paymentTypeId: String,
  sizeMassTo: String,
  sizeVolumeTo: String,
  waypointListSource: [],
  waypointListTarget: []
  //dellaInfo: mongoose.Schema.Types.Mixed,
})

let card = mongoose.model('card', cardSchema);

let myFistCard = {
  bodyTypeId: "26",
  contentName: "торф навалом",
  dateFrom: "2021-11-19",
  dateTo: "2021-11-26",
  idDella: "21306185820766656",
  loadTypes: [],
  note: "",
  paymentCurrencyId: "2",
  paymentMomentId: "4",
  paymentPrice: "23000",
  paymentTypeId: "2",
  sizeMassTo: "19",
  sizeVolumeTo: "32",
  waypointListSource: [
    {areaId: '19', countrySign: 'UA', townName: 'Озеряни'}
  ],
  waypointListTarget: [
    {areaId: '34', countrySign: 'UA', townName: 'Харків'}
  ],
}

/* let test11 = new testCard(myFistCard)

test11.save((err, user) => {
  if (err) {
    console.log('err', err)
  }
  console.log('saved user', user)
}) */

let test = testCard.updateOne({idDella: "21306185820766656"}, {note: "Успішно оновлено"}).then(() => {
  console.log(test)
})