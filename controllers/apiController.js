const card = require('../models/card');
const serverSettings = require ('../models/serverSettings');


exports.showCards = async function (req, res) {
    let data = await card.find({})
    res.status(200).json(data)
}

exports.hello = function (req, res) {
    res.send("Вы попали в API");
}

exports.settingsSet = async function (req, res) {
    let postData = req.body;
    let updated = await serverSettings.updateOne({ _id: postData._id}, postData);
    
    res.send(postData)
}

exports.settingsRequest = async function (req, res) {
    let data = await serverSettings.find()

    res.status(200).json(data[0])
}