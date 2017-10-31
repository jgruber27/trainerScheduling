'use strict';

/**
 * Module dependencies
 */
var availabilitiesPolicy = require('../policies/availabilities.server.policy'),
  availabilities = require('../controllers/availabilities.server.controller');

module.exports = function(app) {
  // Availabilities Routes
  app.route('/api/availabilities').all(availabilitiesPolicy.isAllowed)
    .get(availabilities.list)
    .post(availabilities.create);

  app.route('/api/availabilities/:availabilityId').all(availabilitiesPolicy.isAllowed)
    .get(availabilities.read)
    .put(availabilities.update)
    .delete(availabilities.delete);

  // Finish by binding the Availability middleware
  app.param('availabilityId', availabilities.availabilityByID);
};
