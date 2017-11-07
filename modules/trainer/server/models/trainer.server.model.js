'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Trainer Schema
 */
var TrainerSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Announcement Title',
    trim: true
  },
  announcement: {
    type: String,
    default: '',
    required: 'Enter The announcement',
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

mongoose.model('Trainer', TrainerSchema);
