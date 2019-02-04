var mongoose = require('mongoose');
var requirementModel = require('../modules/requirement/model');

function connectDB(url) {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

  requirementModel.create();
}


module.exports = {
  connectDB: connectDB,
};