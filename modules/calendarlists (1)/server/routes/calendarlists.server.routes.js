'use strict';

/**
 * Module dependencies
 */
var calendarlistsPolicy = require('../policies/calendarlists.server.policy'),
  calendarlists = require('../controllers/calendarlists.server.controller');

module.exports = function(app) {
  // Calendarlists Routes
  app.route('/api/calendarlists').all(calendarlistsPolicy.isAllowed)
    .get(calendarlists.list)
    .post(calendarlists.create);

  app.route('/api/calendarlists/:calendarlistId').all(calendarlistsPolicy.isAllowed)
    .get(calendarlists.read)
    .put(calendarlists.update)
    .delete(calendarlists.delete);

  // Finish by binding the Calendarlist middleware
  app.param('calendarlistId', calendarlists.calendarlistByID);
};
