'use strict';

/**
 * Module dependencies
 */
var calendarviewsPolicy = require('../policies/calendarviews.server.policy'),
  calendarviews = require('../controllers/calendarviews.server.controller');

module.exports = function(app) {
  // Calendarviews Routes
  app.route('/api/calendarviews').all(calendarviewsPolicy.isAllowed)
    .get(calendarviews.list)
    .post(calendarviews.create);

  app.route('/api/calendarviews/:calendarviewId').all(calendarviewsPolicy.isAllowed)
    .get(calendarviews.read)
    .put(calendarviews.update)
    .delete(calendarviews.delete);

  // Finish by binding the Calendarview middleware
  app.param('calendarviewId', calendarviews.calendarviewByID);
};
