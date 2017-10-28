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
  Trainer.find(function(err, trainer) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(trainer);
    }
  });
};
