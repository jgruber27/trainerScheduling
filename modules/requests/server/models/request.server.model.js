'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Request Schema
 */
var RequestSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Request name',
    trim: true
  },
  class: {
    type: String,
    default: '',
    required: 'Please fill Class name',
    trim: true
  },
  reason: {
    type: String,
    default: '',
    required: 'Please fill reason out',
    trim: true
  },
  shiftTime: {
    type: String,
    default: 'N/A',
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

mongoose.model('Request', RequestSchema);
