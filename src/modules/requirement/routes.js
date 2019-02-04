var requirementController = require('./controller');

module.exports = function(app) {
  app.post('/', requirementController.createRequirement);
  app.get('/', requirementController.getRequirements);
  app.get('/state/:state', requirementController.getRequirements);
  app.get('/state/not/:nostate', requirementController.getRequirements);
  app.get('/:id', requirementController.getRequirementById);
  app.put('/:id', requirementController.updateRequirementById);
  app.put('/:id/:state', requirementController.updateRequirementById);
};