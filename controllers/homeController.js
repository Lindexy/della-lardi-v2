const path = require('path');

exports.index = function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
};
exports.about = function (req, res) {
    //res.cookie('cookieName', 'cookieValue', { expires: new Date(0) });

    console.log(req.cookies);
    res.send("О сайте");
};