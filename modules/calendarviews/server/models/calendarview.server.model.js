'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Calendarview Schema
 */
var CalendarviewSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill in class name',
    trim: true
  },
  trainer: {
    type: String,
    default: '',
    required: 'Please fill in trainer',
    trim: true
  },
  start: {
    type: Date,
    default: Date.now,
    required: 'Please fill in start',
    trim: true
  },
  end: {
    type: Date,
    default: Date.now,
    required: 'Please fill in end',
    trim: true
  },
  details: String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
CalendarviewSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created)
  {
    this.created = currentTime;
  }
  next();
});

mongoose.model('Calendarview', CalendarviewSchema);
