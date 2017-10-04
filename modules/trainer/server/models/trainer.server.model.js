'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Trainer Schema
 */
/*var BlogSchema = new Schema({
  _id: {
    type: String
  },
  blog: {
    type: String
  }
});*/
var TrainerSchema = new Schema({
  // Trainer model fields
  // ...
});

var Trainer = mongoose.model('Trainer', TrainerSchema);
//var Blog = mongoose.model('Blog', BlogSchema);


module.exports = Trainer;
//module.exports = Blog;