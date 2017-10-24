'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Staffview Schema
 */
var StaffviewSchema = new Schema({
  mondayFrom: {
    type: String,
    default: '',
    trim: true
  },
  mondayTo: {
    type: String,
    default: '',
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

mongoose.model('Staffview', StaffviewSchema);
