var express = require("express");
// Modules
var requirement = require('./modules/requirement/index');
// DB
var mongoDB = require('./db/index');
// Helpers
var bodyParser = require('body-parser');
var cors = require('cors');
// Config
var config = require('./env/config.json')['local'];//[process.env.NODE_ENV || 'local'];

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoURL = process.env.MONGODB_URI || config.mongo.url;
mongoDB.connectDB(mongoURL);

app.use('/requirements', requirement);

var port = process.env.PORT || config.port;

// Handling not found errors
app.use(function(req, res) {
  res.status(404).send();
});

// Handling internal code errors
app.use(function(err, req, res) {
  res.status(500).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}, mongoose on ${mongoURL}`);
});