'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Blog name',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim: true
  },
  video: {
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

mongoose.model('Blog', BlogSchema);
