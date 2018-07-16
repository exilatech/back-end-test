
// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exelia-test');
var backMiddleware = require('./middlewares/backend-middleware');
var beer = require('./www/backend-controllers/beer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3005;
var router = express.Router();

router.get('/', function (req, res) { res.json({ "info": "al+++__ive5-api landing page v1.1.0" }) });

router.post('/beer/add', beer.addBeer);
router.post('/beer/updateRating', beer.updateRating);
router.post('/beer/getBeers', beer.getBeers);
 
app.use(express.static('static'));
app.use('/', router); // required base url
app.listen(port); // listen for requests

console.log('server started on port ' + port);
