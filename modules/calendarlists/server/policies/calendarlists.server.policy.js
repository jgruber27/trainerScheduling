'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Calendarlists Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/calendarlists',
      permissions: '*'
    }, {
      resources: '/api/calendarlists/:calendarlistId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/calendarlists',
      permissions: ['get', 'post']
    }, {
      resources: '/api/calendarlists/:calendarlistId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/calendarlists',
      permissions: ['get']
    }, {
      resources: '/api/calendarlists/:calendarlistId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Calendarlists Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Calendarlist is being processed and the current user created it then allow any manipulation
  if (req.calendarlist && req.user && req.calendarlist.user && req.calendarlist.user.id === req.user.id) {
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
