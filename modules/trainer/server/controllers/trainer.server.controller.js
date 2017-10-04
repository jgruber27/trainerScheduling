'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Blog = require('../models/trainer.server.model.js');

/**
 * Create a Trainer
 */
exports.create = function (req, res) {

};

/**
 * Show the current Trainer
 */
exports.read = function (req, res) {

};

/**
 * Update a Trainer
 */
exports.update = function (req, res) {

};

/**
 * Delete an Trainer
 */
exports.delete = function (req, res) {

};

/**
 * List of Trainers
 */
exports.list = function (req, res) {
	  Blog.find(function(err,blog) {
	    if(err) {
	      console.log(err);
	      res.status(400).send(err);
	    }
	  else {
	      res.json(blog);
	    }
	  });
};
