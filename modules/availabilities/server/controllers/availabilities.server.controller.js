'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Availability = mongoose.model('Availability'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Availability
 */
exports.create = function(req, res) {
  var availability = new Availability(req.body);
  availability.user = req.user;

  availability.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(availability);
    }
  });
};

/**
 * Show the current Availability
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var availability = req.availability ? req.availability.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  availability.isCurrentUserOwner = req.user && availability.user && availability.user._id.toString() === req.user._id.toString();
  res.jsonp(availability);
};

/**
 * Update a Availability
 */
exports.update = function(req, res) {
  var availability = req.availability;

  availability = _.extend(availability, req.body);

  availability.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(availability);
    }
  });
};

/**
 * Delete an Availability
 */
exports.delete = function(req, res) {
  var availability = req.availability;

  availability.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(availability);
    }
  });
};

/**
 * List of Availabilities
 */
exports.list = function(req, res) {
  Availability.find().sort('-created').populate('user', 'displayName').exec(function(err, availabilities) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(availabilities);
    }
  });
};

/**
 * Availability middleware
 */
exports.availabilityByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Availability is invalid'
    });
  }

  Availability.findById(id).populate('user', 'displayName').exec(function (err, availability) {
    if (err) {
      return next(err);
    } else if (!availability) {
      return res.status(404).send({
        message: 'No Availability with that identifier has been found'
      });
    }
    req.availability = availability;
    next();
  });
};
