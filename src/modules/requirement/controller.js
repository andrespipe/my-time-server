var mongoose = require('mongoose');

function createRequirement(req, res){
  var data = req.body;
  var Requirement = mongoose.model('Requirement');
  var requirementDocument = new Requirement(data);

  requirementDocument.save(function (err, storedRequirement) {
    if (err) {
      res.status(500).json({ err: err });
    } else {
      res.status(200).json(storedRequirement);
    }
  });
}

function getRequirements(req, res) {
  var query ={ };
  var Requirement = mongoose.model('Requirement');
  Requirement.countDocuments(function (err, count) {
    if(err) {
      res.status(500).json({ err: err });
    } else if(count > 0) {
      Requirement
        .find(query)
        .exec(function (err, docs) {
          if (err) {
            res.status(500).json({ err: err });
          } else {
            res.status(200).json({ total: count, docs: docs });
          }
        });
    } else {
      res.status(200).json({ total: count, docs: [] });
    }
  });
}

function getRequirementById(req, res) {
  var id = Number(req.params.id);
  mongoose.model('Requirement').findOne({ id: id }, function (err, storedRequirement){
    if (err) {
      res.status(500).json({ err: err });
    } else if (!storedRequirement) {
      res.status(404).send();
    } else {
      res.status(200).json(storedRequirement);
    }
  });
}

function updateRequirementById(req, res) {
  var data = req.body;
  var id = Number(req.params.id);
  var state = req.params.state;
  var Requirement = mongoose.model('Requirement');

  var set = state ? { $set: { state: state } } : { $set: data };
  
  Requirement.update({ id: id }, set, function(err, storedRequirement){
    if (err) {
      res.status(500).json({ err: err });
    } else {
      res.status(200).json(storedRequirement);
    }
  });
}


module.exports = {
  createRequirement: createRequirement,
  getRequirementById: getRequirementById,
  getRequirements: getRequirements,
  updateRequirementById: updateRequirementById
};
