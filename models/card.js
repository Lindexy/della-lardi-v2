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

module.exports = card