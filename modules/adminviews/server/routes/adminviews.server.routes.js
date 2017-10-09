'use strict';

/**
 * Module dependencies
 */
var adminviewsPolicy = require('../policies/adminviews.server.policy'),
  adminviews = require('../controllers/adminviews.server.controller');

module.exports = function(app) {
  // Adminviews Routes
  app.route('/api/adminviews').all(adminviewsPolicy.isAllowed)
    .get(adminviews.list)
    .post(adminviews.create);

  app.route('/api/adminviews/:adminviewId').all(adminviewsPolicy.isAllowed)
    .get(adminviews.read)
    .put(adminviews.update)
    .delete(adminviews.delete);

  // Finish by binding the Adminview middleware
  app.param('adminviewId', adminviews.adminviewByID);
};
