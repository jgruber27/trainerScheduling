'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Adminview = mongoose.model('Adminview'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Adminview
 */
exports.create = function(req, res) {
  var adminview = new Adminview(req.body);
  adminview.user = req.user;

  adminview.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(adminview);
    }
  });
};

/**
 * Show the current Adminview
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var adminview = req.adminview ? req.adminview.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  adminview.isCurrentUserOwner = req.user && adminview.user && adminview.user._id.toString() === req.user._id.toString();

  res.jsonp(adminview);
};

/**
 * Update a Adminview
 */
exports.update = function(req, res) {
  var adminview = req.adminview;

  adminview = _.extend(adminview, req.body);

  adminview.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(adminview);
    }
  });
};

/**
 * Delete an Adminview
 */
exports.delete = function(req, res) {
  var adminview = req.adminview;

  adminview.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(adminview);
    }
  });
};

/**
 * List of Adminviews
 */
exports.list = function(req, res) {
  Adminview.find().sort('-created').populate('user', 'displayName').exec(function(err, adminviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(adminviews);
    }
  });
};

/**
 * Adminview middleware
 */
exports.adminviewByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Adminview is invalid'
    });
  }

  Adminview.findById(id).populate('user', 'displayName').exec(function (err, adminview) {
    if (err) {
      return next(err);
    } else if (!adminview) {
      return res.status(404).send({
        message: 'No Adminview with that identifier has been found'
      });
    }
    req.adminview = adminview;
    next();
  });
};
