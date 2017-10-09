'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Adminview Schema
 */
var AdminviewSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Adminview name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Adminview', AdminviewSchema);
