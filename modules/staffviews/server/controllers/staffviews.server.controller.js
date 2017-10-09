'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Staffview = mongoose.model('Staffview'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Staffview
 */
exports.create = function(req, res) {
  var staffview = new Staffview(req.body);
  staffview.user = req.user;

  staffview.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(staffview);
    }
  });
};

/**
 * Show the current Staffview
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var staffview = req.staffview ? req.staffview.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  staffview.isCurrentUserOwner = req.user && staffview.user && staffview.user._id.toString() === req.user._id.toString();

  res.jsonp(staffview);
};

/**
 * Update a Staffview
 */
exports.update = function(req, res) {
  var staffview = req.staffview;

  staffview = _.extend(staffview, req.body);

  staffview.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(staffview);
    }
  });
};

/**
 * Delete an Staffview
 */
exports.delete = function(req, res) {
  var staffview = req.staffview;

  staffview.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(staffview);
    }
  });
};

/**
 * List of Staffviews
 */
exports.list = function(req, res) {
  Staffview.find().sort('-created').populate('user', 'displayName').exec(function(err, staffviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(staffviews);
    }
  });
};

/**
 * Staffview middleware
 */
exports.staffviewByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Staffview is invalid'
    });
  }

  Staffview.findById(id).populate('user', 'displayName').exec(function (err, staffview) {
    if (err) {
      return next(err);
    } else if (!staffview) {
      return res.status(404).send({
        message: 'No Staffview with that identifier has been found'
      });
    }
    req.staffview = staffview;
    next();
  });
};
