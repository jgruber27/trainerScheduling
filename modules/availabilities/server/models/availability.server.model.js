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
    value1: { type: Boolean, required: false, default: false }, //7am
    value2: { type: Boolean, required: false, default: false }, //8am
    value2: { type: Boolean, required: false, default: false }, //9am
  },
  tuesday: {
    value1: { type: Boolean, required: false, default: false }, //7am
    value2: { type: Boolean, required: false, default: false }, //8am
    value2: { type: Boolean, required: false, default: false }, //9am
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
