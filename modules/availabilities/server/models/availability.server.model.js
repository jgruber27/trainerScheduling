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
    val_7am: { type: Boolean, required: false   }, //7am
    val_8am: { type: Boolean, required: false   }, //8am
    val_9am: { type: Boolean, required: false   }, //9am
    val_10am: { type: Boolean, required: false  }, //10am
    val_11am: { type: Boolean, required: false  }, //11am
    val_12pm: { type: Boolean, required: false  }, //12pm
    val_1pm: { type: Boolean, required: false   }, //1pm
    val_2pm: { type: Boolean, required: false   }, //2pm
    val_3pm: { type: Boolean, required: false   }, //3pm
    val_4pm: { type: Boolean, required: false   }, //4pm
    val_5pm: { type: Boolean, required: false   }, //5pm
    val_6pm: { type: Boolean, required: false   }, //6pm
    val_7pm: { type: Boolean, required: false   }, //7pm
    val_8pm: { type: Boolean, required: false   }, //8pm
    val_9pm: { type: Boolean, required: false   }, //9pm
  },
  tuesday: {
    val_7am: { type: Boolean, required: false   }, //7am
    val_8am: { type: Boolean, required: false   }, //8am
    val_9am: { type: Boolean, required: false   }, //9am
    val_10am: { type: Boolean, required: false  }, //10am
    val_11am: { type: Boolean, required: false  }, //11am
    val_12pm: { type: Boolean, required: false  }, //12pm
    val_1pm: { type: Boolean, required: false   }, //1pm
    val_2pm: { type: Boolean, required: false   }, //2pm
    val_3pm: { type: Boolean, required: false   }, //3pm
    val_4pm: { type: Boolean, required: false   }, //4pm
    val_5pm: { type: Boolean, required: false   }, //5pm
    val_6pm: { type: Boolean, required: false   }, //6pm
    val_7pm: { type: Boolean, required: false   }, //7pm
    val_8pm: { type: Boolean, required: false   }, //8pm
    val_9pm: { type: Boolean, required: false   }, //9pm
  },
  wednesday: {
    val_7am: { type: Boolean, required: false   }, //7am
    val_8am: { type: Boolean, required: false   }, //8am
    val_9am: { type: Boolean, required: false   }, //9am
    val_10am: { type: Boolean, required: false  }, //10am
    val_11am: { type: Boolean, required: false  }, //11am
    val_12pm: { type: Boolean, required: false  }, //12pm
    val_1pm: { type: Boolean, required: false   }, //1pm
    val_2pm: { type: Boolean, required: false   }, //2pm
    val_3pm: { type: Boolean, required: false   }, //3pm
    val_4pm: { type: Boolean, required: false   }, //4pm
    val_5pm: { type: Boolean, required: false   }, //5pm
    val_6pm: { type: Boolean, required: false   }, //6pm
    val_7pm: { type: Boolean, required: false   }, //7pm
    val_8pm: { type: Boolean, required: false   }, //8pm
    val_9pm: { type: Boolean, required: false   }, //9pm
  },
  thursday: {
    val_7am: { type: Boolean, required: false   }, //7am
    val_8am: { type: Boolean, required: false   }, //8am
    val_9am: { type: Boolean, required: false   }, //9am
    val_10am: { type: Boolean, required: false  }, //10am
    val_11am: { type: Boolean, required: false  }, //11am
    val_12pm: { type: Boolean, required: false  }, //12pm
    val_1pm: { type: Boolean, required: false   }, //1pm
    val_2pm: { type: Boolean, required: false   }, //2pm
    val_3pm: { type: Boolean, required: false   }, //3pm
    val_4pm: { type: Boolean, required: false   }, //4pm
    val_5pm: { type: Boolean, required: false   }, //5pm
    val_6pm: { type: Boolean, required: false   }, //6pm
    val_7pm: { type: Boolean, required: false   }, //7pm
    val_8pm: { type: Boolean, required: false   }, //8pm
    val_9pm: { type: Boolean, required: false   }, //9pm
  },
  friday: {
    val_7am: { type: Boolean, required: false   }, //7am
    val_8am: { type: Boolean, required: false   }, //8am
    val_9am: { type: Boolean, required: false   }, //9am
    val_10am: { type: Boolean, required: false  }, //10am
    val_11am: { type: Boolean, required: false  }, //11am
    val_12pm: { type: Boolean, required: false  }, //12pm
    val_1pm: { type: Boolean, required: false   }, //1pm
    val_2pm: { type: Boolean, required: false   }, //2pm
    val_3pm: { type: Boolean, required: false   }, //3pm
    val_4pm: { type: Boolean, required: false   }, //4pm
    val_5pm: { type: Boolean, required: false   }, //5pm
    val_6pm: { type: Boolean, required: false   }, //6pm
    val_7pm: { type: Boolean, required: false   }, //7pm
    val_8pm: { type: Boolean, required: false   }, //8pm
    val_9pm: { type: Boolean, required: false   }, //9pm
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
