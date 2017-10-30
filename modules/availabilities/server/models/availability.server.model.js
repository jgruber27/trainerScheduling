'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Availability Schema
 */
var AvailabilitySchema = new Schema({
  monday: {
    value1: { type: Boolean, required: false, default: false },
    value2: { type: Boolean, required: false, default: false },
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

mongoose.model('Availability', AvailabilitySchema);
