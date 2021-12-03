const path = require('path');

exports.index = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
};
exports.about = function (req, res) {
    res.send("О сайте");
};