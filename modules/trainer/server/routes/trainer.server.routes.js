'use strict';


var trainer = require('../controllers/trainer.server.controller');

module.exports = function(app) {
  // Trainer Routes
  app.route('/api/trainer').all()
    .get(trainer.list)
    .post(trainer.create);



  app.route('/api/trainer/:trainerId').all()
    .get(trainer.read)
    .put(trainer.update)
    .delete(trainer.delete);

  // Finish by binding the Trainer middleware
  app.param('trainerId', trainer.requestByID);
};



