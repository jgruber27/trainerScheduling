'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Trainer = mongoose.model('Trainer');

/**
 * Create a Trainer
 */
exports.create = function(req, res) {
  var trainer = new Trainer(req.body);
  trainer.user = req.user;

  trainer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trainer);
    }
  });
};


/**
 * Show the current Trainer
 */
exports.read = function(req, res) {
  // Puts mongoose doc into JSON format
  var trainer = req.trainer ? req.trainer.toJSON() : {};
  trainer.isCurrentUserOwner = req.user && trainer.user && trainer.user._id.toString() === req.user._id.toString();
  res.jsonp(trainer);
};

/**
 * Update a Trainer
 */
exports.update = function(req, res) {
  var trainer = req.trainer;

  trainer = _.extend(trainer, req.body);

  trainer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trainer);
    }
  });
};

/**
 * Delete a Trainer
 */
exports.delete = function(req, res) {
  var trainer = req.trainer;

  trainer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trainer);
    }
  });
};

/**
 * List of Trainers
 */
exports.list = function(req, res) {
  Trainer.find().populate('user', 'displayName').exec(function(err, trainer) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(trainer);
    }
  });
};

/**
 * Request middleware
 */
exports.requestByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Request is invalid'
    });
  }

  Trainer.findById(id).populate('user', 'displayName').exec(function (err, trainer) {
    if (err) {
      return next(err);
    } else if (!trainer) {
      return res.status(404).send({
        message: 'No Announcement with that identifier has been found'
      });
    }
    req.trainer = trainer;
    next();
  });
};