let mongoose = require('mongoose');

let serveSchema = mongoose.Schema({
    scraping: Boolean,
    filters: [],
})

let serverSettings = mongoose.model('serverSettings', serveSchema);

module.exports = serverSettings