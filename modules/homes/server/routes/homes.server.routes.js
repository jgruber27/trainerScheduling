'use strict';

/**
 * Module dependencies
 */
var homesPolicy = require('../policies/homes.server.policy'),
  homes = require('../controllers/homes.server.controller');

module.exports = function(app) {
  // Homes Routes
  app.route('/api/homes').all(homesPolicy.isAllowed)
    .get(homes.list)
    .post(homes.create);

  app.route('/api/homes/:homeId').all(homesPolicy.isAllowed)
    .get(homes.read)
    .put(homes.update)
    .delete(homes.delete);

  // Finish by binding the Home middleware
  app.param('homeId', homes.homeByID);
};