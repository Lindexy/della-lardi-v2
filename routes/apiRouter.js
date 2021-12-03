const express = require('express');
const apiController = require('../controllers/apiController')
const apiRouter = express.Router();

apiRouter.get('/cards', apiController.showCards);
apiRouter.get('/', apiController.hello);

module.exports = apiRouter