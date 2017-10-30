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
  monday: {
    value1: { type: Boolean, required: false, default: false },
    value2: { type: Boolean, required: false, default: false },
    // value1: String,
    // default: '',
    // trim: true
  },
  tuesday: {
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
