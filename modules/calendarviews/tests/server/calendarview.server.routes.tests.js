'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Calendarview = mongoose.model('Calendarview'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  calendarview;

/**
 * Calendarview routes tests
 */
describe('Calendarview CRUD tests', function () {

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

    // Save a user to the test db and create new Calendarview
    user.save(function () {
      calendarview = {
        name: 'Calendarview name'
      };

      done();
    });
  });

  it('should be able to save a Calendarview if logged in', function (done) {
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

        // Save a new Calendarview
        agent.post('/api/calendarviews')
          .send(calendarview)
          .expect(200)
          .end(function (calendarviewSaveErr, calendarviewSaveRes) {
            // Handle Calendarview save error
            if (calendarviewSaveErr) {
              return done(calendarviewSaveErr);
            }

            // Get a list of Calendarviews
            agent.get('/api/calendarviews')
              .end(function (calendarviewsGetErr, calendarviewsGetRes) {
                // Handle Calendarviews save error
                if (calendarviewsGetErr) {
                  return done(calendarviewsGetErr);
                }

                // Get Calendarviews list
                var calendarviews = calendarviewsGetRes.body;

                // Set assertions
                (calendarviews[0].user._id).should.equal(userId);
                (calendarviews[0].name).should.match('Calendarview name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Calendarview if not logged in', function (done) {
    agent.post('/api/calendarviews')
      .send(calendarview)
      .expect(403)
      .end(function (calendarviewSaveErr, calendarviewSaveRes) {
        // Call the assertion callback
        done(calendarviewSaveErr);
      });
  });

  it('should not be able to save an Calendarview if no name is provided', function (done) {
    // Invalidate name field
    calendarview.name = '';

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

        // Save a new Calendarview
        agent.post('/api/calendarviews')
          .send(calendarview)
          .expect(400)
          .end(function (calendarviewSaveErr, calendarviewSaveRes) {
            // Set message assertion
            (calendarviewSaveRes.body.message).should.match('Please fill Calendarview name');

            // Handle Calendarview save error
            done(calendarviewSaveErr);
          });
      });
  });

  it('should be able to update an Calendarview if signed in', function (done) {
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

        // Save a new Calendarview
        agent.post('/api/calendarviews')
          .send(calendarview)
          .expect(200)
          .end(function (calendarviewSaveErr, calendarviewSaveRes) {
            // Handle Calendarview save error
            if (calendarviewSaveErr) {
              return done(calendarviewSaveErr);
            }

            // Update Calendarview name
            calendarview.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Calendarview
            agent.put('/api/calendarviews/' + calendarviewSaveRes.body._id)
              .send(calendarview)
              .expect(200)
              .end(function (calendarviewUpdateErr, calendarviewUpdateRes) {
                // Handle Calendarview update error
                if (calendarviewUpdateErr) {
                  return done(calendarviewUpdateErr);
                }

                // Set assertions
                (calendarviewUpdateRes.body._id).should.equal(calendarviewSaveRes.body._id);
                (calendarviewUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Calendarviews if not signed in', function (done) {
    // Create new Calendarview model instance
    var calendarviewObj = new Calendarview(calendarview);

    // Save the calendarview
    calendarviewObj.save(function () {
      // Request Calendarviews
      request(app).get('/api/calendarviews')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Calendarview if not signed in', function (done) {
    // Create new Calendarview model instance
    var calendarviewObj = new Calendarview(calendarview);

    // Save the Calendarview
    calendarviewObj.save(function () {
      request(app).get('/api/calendarviews/' + calendarviewObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', calendarview.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Calendarview with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/calendarviews/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Calendarview is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Calendarview which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Calendarview
    request(app).get('/api/calendarviews/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Calendarview with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Calendarview if signed in', function (done) {
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

        // Save a new Calendarview
        agent.post('/api/calendarviews')
          .send(calendarview)
          .expect(200)
          .end(function (calendarviewSaveErr, calendarviewSaveRes) {
            // Handle Calendarview save error
            if (calendarviewSaveErr) {
              return done(calendarviewSaveErr);
            }

            // Delete an existing Calendarview
            agent.delete('/api/calendarviews/' + calendarviewSaveRes.body._id)
              .send(calendarview)
              .expect(200)
              .end(function (calendarviewDeleteErr, calendarviewDeleteRes) {
                // Handle calendarview error error
                if (calendarviewDeleteErr) {
                  return done(calendarviewDeleteErr);
                }

                // Set assertions
                (calendarviewDeleteRes.body._id).should.equal(calendarviewSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Calendarview if not signed in', function (done) {
    // Set Calendarview user
    calendarview.user = user;

    // Create new Calendarview model instance
    var calendarviewObj = new Calendarview(calendarview);

    // Save the Calendarview
    calendarviewObj.save(function () {
      // Try deleting Calendarview
      request(app).delete('/api/calendarviews/' + calendarviewObj._id)
        .expect(403)
        .end(function (calendarviewDeleteErr, calendarviewDeleteRes) {
          // Set message assertion
          (calendarviewDeleteRes.body.message).should.match('User is not authorized');

          // Handle Calendarview error error
          done(calendarviewDeleteErr);
        });

    });
  });

  it('should be able to get a single Calendarview that has an orphaned user reference', function (done) {
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

          // Save a new Calendarview
          agent.post('/api/calendarviews')
            .send(calendarview)
            .expect(200)
            .end(function (calendarviewSaveErr, calendarviewSaveRes) {
              // Handle Calendarview save error
              if (calendarviewSaveErr) {
                return done(calendarviewSaveErr);
              }

              // Set assertions on new Calendarview
              (calendarviewSaveRes.body.name).should.equal(calendarview.name);
              should.exist(calendarviewSaveRes.body.user);
              should.equal(calendarviewSaveRes.body.user._id, orphanId);

              // force the Calendarview to have an orphaned user reference
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

                    // Get the Calendarview
                    agent.get('/api/calendarviews/' + calendarviewSaveRes.body._id)
                      .expect(200)
                      .end(function (calendarviewInfoErr, calendarviewInfoRes) {
                        // Handle Calendarview error
                        if (calendarviewInfoErr) {
                          return done(calendarviewInfoErr);
                        }

                        // Set assertions
                        (calendarviewInfoRes.body._id).should.equal(calendarviewSaveRes.body._id);
                        (calendarviewInfoRes.body.name).should.equal(calendarview.name);
                        should.equal(calendarviewInfoRes.body.user, undefined);

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
      Calendarview.remove().exec(done);
    });
  });
});
