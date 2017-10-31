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
    required: 'Please fill Calendarview name',
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

mongoose.model('Calendarview', CalendarviewSchema);
