'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Calendarviews Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/calendarviews',
      permissions: '*'
    }, {
      resources: '/api/calendarviews/:calendarviewId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/calendarviews',
      permissions: ['get', 'post']
    }, {
      resources: '/api/calendarviews/:calendarviewId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/calendarviews',
      permissions: ['get']
    }, {
      resources: '/api/calendarviews/:calendarviewId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Calendarviews Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Calendarview is being processed and the current user created it then allow any manipulation
  if (req.calendarview && req.user && req.calendarview.user && req.calendarview.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
