'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Availability = mongoose.model('Availability'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  availability;

/**
 * Availability routes tests
 */
describe('Availability CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Availability
    user.save(function () {
      availability = {
        name: 'Availability name'
      };

      done();
    });
  });

  it('should be able to save a Availability if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Availability
        agent.post('/api/availabilities')
          .send(availability)
          .expect(200)
          .end(function (availabilitySaveErr, availabilitySaveRes) {
            // Handle Availability save error
            if (availabilitySaveErr) {
              return done(availabilitySaveErr);
            }

            // Get a list of Availabilities
            agent.get('/api/availabilities')
              .end(function (availabilitiesGetErr, availabilitiesGetRes) {
                // Handle Availabilities save error
                if (availabilitiesGetErr) {
                  return done(availabilitiesGetErr);
                }

                // Get Availabilities list
                var availabilities = availabilitiesGetRes.body;

                // Set assertions
                (availabilities[0].user._id).should.equal(userId);
                (availabilities[0].name).should.match('Availability name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Availability if not logged in', function (done) {
    agent.post('/api/availabilities')
      .send(availability)
      .expect(403)
      .end(function (availabilitySaveErr, availabilitySaveRes) {
        // Call the assertion callback
        done(availabilitySaveErr);
      });
  });

  it('should not be able to save an Availability if no name is provided', function (done) {
    // Invalidate name field
    availability.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Availability
        agent.post('/api/availabilities')
          .send(availability)
          .expect(400)
          .end(function (availabilitySaveErr, availabilitySaveRes) {
            // Set message assertion
            (availabilitySaveRes.body.message).should.match('Please fill Availability name');

            // Handle Availability save error
            done(availabilitySaveErr);
          });
      });
  });

  it('should be able to update an Availability if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Availability
        agent.post('/api/availabilities')
          .send(availability)
          .expect(200)
          .end(function (availabilitySaveErr, availabilitySaveRes) {
            // Handle Availability save error
            if (availabilitySaveErr) {
              return done(availabilitySaveErr);
            }

            // Update Availability name
            availability.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Availability
            agent.put('/api/availabilities/' + availabilitySaveRes.body._id)
              .send(availability)
              .expect(200)
              .end(function (availabilityUpdateErr, availabilityUpdateRes) {
                // Handle Availability update error
                if (availabilityUpdateErr) {
                  return done(availabilityUpdateErr);
                }

                // Set assertions
                (availabilityUpdateRes.body._id).should.equal(availabilitySaveRes.body._id);
                (availabilityUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Availabilities if not signed in', function (done) {
    // Create new Availability model instance
    var availabilityObj = new Availability(availability);

    // Save the availability
    availabilityObj.save(function () {
      // Request Availabilities
      request(app).get('/api/availabilities')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Availability if not signed in', function (done) {
    // Create new Availability model instance
    var availabilityObj = new Availability(availability);

    // Save the Availability
    availabilityObj.save(function () {
      request(app).get('/api/availabilities/' + availabilityObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', availability.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Availability with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/availabilities/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Availability is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Availability which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Availability
    request(app).get('/api/availabilities/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Availability with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Availability if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Availability
        agent.post('/api/availabilities')
          .send(availability)
          .expect(200)
          .end(function (availabilitySaveErr, availabilitySaveRes) {
            // Handle Availability save error
            if (availabilitySaveErr) {
              return done(availabilitySaveErr);
            }

            // Delete an existing Availability
            agent.delete('/api/availabilities/' + availabilitySaveRes.body._id)
              .send(availability)
              .expect(200)
              .end(function (availabilityDeleteErr, availabilityDeleteRes) {
                // Handle availability error error
                if (availabilityDeleteErr) {
                  return done(availabilityDeleteErr);
                }

                // Set assertions
                (availabilityDeleteRes.body._id).should.equal(availabilitySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Availability if not signed in', function (done) {
    // Set Availability user
    availability.user = user;

    // Create new Availability model instance
    var availabilityObj = new Availability(availability);

    // Save the Availability
    availabilityObj.save(function () {
      // Try deleting Availability
      request(app).delete('/api/availabilities/' + availabilityObj._id)
        .expect(403)
        .end(function (availabilityDeleteErr, availabilityDeleteRes) {
          // Set message assertion
          (availabilityDeleteRes.body.message).should.match('User is not authorized');

          // Handle Availability error error
          done(availabilityDeleteErr);
        });

    });
  });

  it('should be able to get a single Availability that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Availability
          agent.post('/api/availabilities')
            .send(availability)
            .expect(200)
            .end(function (availabilitySaveErr, availabilitySaveRes) {
              // Handle Availability save error
              if (availabilitySaveErr) {
                return done(availabilitySaveErr);
              }

              // Set assertions on new Availability
              (availabilitySaveRes.body.name).should.equal(availability.name);
              should.exist(availabilitySaveRes.body.user);
              should.equal(availabilitySaveRes.body.user._id, orphanId);

              // force the Availability to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Availability
                    agent.get('/api/availabilities/' + availabilitySaveRes.body._id)
                      .expect(200)
                      .end(function (availabilityInfoErr, availabilityInfoRes) {
                        // Handle Availability error
                        if (availabilityInfoErr) {
                          return done(availabilityInfoErr);
                        }

                        // Set assertions
                        (availabilityInfoRes.body._id).should.equal(availabilitySaveRes.body._id);
                        (availabilityInfoRes.body.name).should.equal(availability.name);
                        should.equal(availabilityInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Availability.remove().exec(done);
    });
  });
});
