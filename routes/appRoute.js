const express  = require('express');
const appRoute = express.Router();
const {handelToGenerateCodeForUrlRedirect,handelUrlToRedirect} = require('../controllers/appController');

appRoute.post('/getCode',handelToGenerateCodeForUrlRedirect);
appRoute.get('/',handelUrlToRedirect);

module.exports = appRoute;