const card = require('../models/card');

exports.showCards = async function (req, res) {
    let data = await card.find({})
    res.status(200).json(data)
}

exports.hello = function (req, res) {
    res.send("Вы попали в API");
}