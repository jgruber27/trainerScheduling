'use strict';


var trainer = require('../controllers/trainer.server.controller');

module.exports = function(app) {
  // Requests Routes
  app.route('/api/trainer').all()
    .get(trainer.list)
    .post(trainer.create)
    .get(trainer.read)
    .put(trainer.update)
    .delete(trainer.delete);
};

