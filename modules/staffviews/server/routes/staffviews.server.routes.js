'use strict';

/**
 * Module dependencies
 */
var staffviewsPolicy = require('../policies/staffviews.server.policy'),
  staffviews = require('../controllers/staffviews.server.controller');

module.exports = function(app) {
  // Staffviews Routes
  app.route('/api/staffviews').all(staffviewsPolicy.isAllowed)
    .get(staffviews.list)
    .post(staffviews.create);

  app.route('/api/staffviews/:staffviewId').all(staffviewsPolicy.isAllowed)
    .get(staffviews.read)
    .put(staffviews.update)
    .delete(staffviews.delete);

  // Finish by binding the Staffview middleware
  app.param('staffviewId', staffviews.staffviewByID);
};
