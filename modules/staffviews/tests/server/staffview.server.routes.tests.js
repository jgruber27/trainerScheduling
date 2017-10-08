'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Staffview = mongoose.model('Staffview'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  staffview;

/**
 * Staffview routes tests
 */
describe('Staffview CRUD tests', function () {

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

    // Save a user to the test db and create new Staffview
    user.save(function () {
      staffview = {
        name: 'Staffview name'
      };

      done();
    });
  });

  it('should be able to save a Staffview if logged in', function (done) {
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

        // Save a new Staffview
        agent.post('/api/staffviews')
          .send(staffview)
          .expect(200)
          .end(function (staffviewSaveErr, staffviewSaveRes) {
            // Handle Staffview save error
            if (staffviewSaveErr) {
              return done(staffviewSaveErr);
            }

            // Get a list of Staffviews
            agent.get('/api/staffviews')
              .end(function (staffviewsGetErr, staffviewsGetRes) {
                // Handle Staffviews save error
                if (staffviewsGetErr) {
                  return done(staffviewsGetErr);
                }

                // Get Staffviews list
                var staffviews = staffviewsGetRes.body;

                // Set assertions
                (staffviews[0].user._id).should.equal(userId);
                (staffviews[0].name).should.match('Staffview name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Staffview if not logged in', function (done) {
    agent.post('/api/staffviews')
      .send(staffview)
      .expect(403)
      .end(function (staffviewSaveErr, staffviewSaveRes) {
        // Call the assertion callback
        done(staffviewSaveErr);
      });
  });

  it('should not be able to save an Staffview if no name is provided', function (done) {
    // Invalidate name field
    staffview.name = '';

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

        // Save a new Staffview
        agent.post('/api/staffviews')
          .send(staffview)
          .expect(400)
          .end(function (staffviewSaveErr, staffviewSaveRes) {
            // Set message assertion
            (staffviewSaveRes.body.message).should.match('Please fill Staffview name');

            // Handle Staffview save error
            done(staffviewSaveErr);
          });
      });
  });

  it('should be able to update an Staffview if signed in', function (done) {
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

        // Save a new Staffview
        agent.post('/api/staffviews')
          .send(staffview)
          .expect(200)
          .end(function (staffviewSaveErr, staffviewSaveRes) {
            // Handle Staffview save error
            if (staffviewSaveErr) {
              return done(staffviewSaveErr);
            }

            // Update Staffview name
            staffview.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Staffview
            agent.put('/api/staffviews/' + staffviewSaveRes.body._id)
              .send(staffview)
              .expect(200)
              .end(function (staffviewUpdateErr, staffviewUpdateRes) {
                // Handle Staffview update error
                if (staffviewUpdateErr) {
                  return done(staffviewUpdateErr);
                }

                // Set assertions
                (staffviewUpdateRes.body._id).should.equal(staffviewSaveRes.body._id);
                (staffviewUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Staffviews if not signed in', function (done) {
    // Create new Staffview model instance
    var staffviewObj = new Staffview(staffview);

    // Save the staffview
    staffviewObj.save(function () {
      // Request Staffviews
      request(app).get('/api/staffviews')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Staffview if not signed in', function (done) {
    // Create new Staffview model instance
    var staffviewObj = new Staffview(staffview);

    // Save the Staffview
    staffviewObj.save(function () {
      request(app).get('/api/staffviews/' + staffviewObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', staffview.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Staffview with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/staffviews/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Staffview is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Staffview which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Staffview
    request(app).get('/api/staffviews/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Staffview with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Staffview if signed in', function (done) {
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

        // Save a new Staffview
        agent.post('/api/staffviews')
          .send(staffview)
          .expect(200)
          .end(function (staffviewSaveErr, staffviewSaveRes) {
            // Handle Staffview save error
            if (staffviewSaveErr) {
              return done(staffviewSaveErr);
            }

            // Delete an existing Staffview
            agent.delete('/api/staffviews/' + staffviewSaveRes.body._id)
              .send(staffview)
              .expect(200)
              .end(function (staffviewDeleteErr, staffviewDeleteRes) {
                // Handle staffview error error
                if (staffviewDeleteErr) {
                  return done(staffviewDeleteErr);
                }

                // Set assertions
                (staffviewDeleteRes.body._id).should.equal(staffviewSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Staffview if not signed in', function (done) {
    // Set Staffview user
    staffview.user = user;

    // Create new Staffview model instance
    var staffviewObj = new Staffview(staffview);

    // Save the Staffview
    staffviewObj.save(function () {
      // Try deleting Staffview
      request(app).delete('/api/staffviews/' + staffviewObj._id)
        .expect(403)
        .end(function (staffviewDeleteErr, staffviewDeleteRes) {
          // Set message assertion
          (staffviewDeleteRes.body.message).should.match('User is not authorized');

          // Handle Staffview error error
          done(staffviewDeleteErr);
        });

    });
  });

  it('should be able to get a single Staffview that has an orphaned user reference', function (done) {
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

          // Save a new Staffview
          agent.post('/api/staffviews')
            .send(staffview)
            .expect(200)
            .end(function (staffviewSaveErr, staffviewSaveRes) {
              // Handle Staffview save error
              if (staffviewSaveErr) {
                return done(staffviewSaveErr);
              }

              // Set assertions on new Staffview
              (staffviewSaveRes.body.name).should.equal(staffview.name);
              should.exist(staffviewSaveRes.body.user);
              should.equal(staffviewSaveRes.body.user._id, orphanId);

              // force the Staffview to have an orphaned user reference
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

                    // Get the Staffview
                    agent.get('/api/staffviews/' + staffviewSaveRes.body._id)
                      .expect(200)
                      .end(function (staffviewInfoErr, staffviewInfoRes) {
                        // Handle Staffview error
                        if (staffviewInfoErr) {
                          return done(staffviewInfoErr);
                        }

                        // Set assertions
                        (staffviewInfoRes.body._id).should.equal(staffviewSaveRes.body._id);
                        (staffviewInfoRes.body.name).should.equal(staffview.name);
                        should.equal(staffviewInfoRes.body.user, undefined);

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
      Staffview.remove().exec(done);
    });
  });
});
