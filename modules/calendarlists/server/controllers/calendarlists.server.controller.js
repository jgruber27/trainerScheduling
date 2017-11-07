'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Calendarlist = mongoose.model('Calendarlist'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Calendarlist
 */
exports.create = function(req, res) {
  var calendarlist = new Calendarlist(req.body);
  calendarlist.user = req.user;

  calendarlist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(calendarlist);
    }
  });
};

/**
 * Show the current Calendarlist
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var calendarlist = req.calendarlist ? req.calendarlist.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  calendarlist.isCurrentUserOwner = req.user && calendarlist.user && calendarlist.user._id.toString() === req.user._id.toString();

  res.jsonp(calendarlist);
};

/**
 * Update a Calendarlist
 */
exports.update = function(req, res) {
  var calendarlist = req.calendarlist;

  calendarlist = _.extend(calendarlist, req.body);

  calendarlist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(calendarlist);
    }
  });
};

/**
 * Delete an Calendarlist
 */
exports.delete = function(req, res) {
  var calendarlist = req.calendarlist;

  calendarlist.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(calendarlist);
    }
  });
};

/**
 * List of Calendarlists
 */
exports.list = function(req, res) {
  Calendarlist.find().sort('-created').populate('user', 'displayName').exec(function(err, calendarlists) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(calendarlists);
    }
  });
};

/**
 * Calendarlist middleware
 */
exports.calendarlistByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Calendarlist is invalid'
    });
  }

  Calendarlist.findById(id).populate('user', 'displayName').exec(function (err, calendarlist) {
    if (err) {
      return next(err);
    } else if (!calendarlist) {
      return res.status(404).send({
        message: 'No Calendarlist with that identifier has been found'
      });
    }
    req.calendarlist = calendarlist;
    next();
  });
};
