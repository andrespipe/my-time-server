var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

module.exports.create = function () {
  autoIncrement.initialize(mongoose);

  var planeSchema = new Schema({
    id: Number,
    employeeID: Number,
    employeeName: String,
    requestDate: String,
    startDate: String,
    endDate: String,
    state: String
  });

  planeSchema.plugin(autoIncrement.plugin, { model: 'Requirement', field: 'id' });
  mongoose.model('Requirement', planeSchema);
};
