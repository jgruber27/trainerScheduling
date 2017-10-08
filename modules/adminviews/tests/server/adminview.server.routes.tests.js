'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Adminview = mongoose.model('Adminview'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  adminview;

/**
 * Adminview routes tests
 */
describe('Adminview CRUD tests', function () {

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

    // Save a user to the test db and create new Adminview
    user.save(function () {
      adminview = {
        name: 'Adminview name'
      };

      done();
    });
  });

  it('should be able to save a Adminview if logged in', function (done) {
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

        // Save a new Adminview
        agent.post('/api/adminviews')
          .send(adminview)
          .expect(200)
          .end(function (adminviewSaveErr, adminviewSaveRes) {
            // Handle Adminview save error
            if (adminviewSaveErr) {
              return done(adminviewSaveErr);
            }

            // Get a list of Adminviews
            agent.get('/api/adminviews')
              .end(function (adminviewsGetErr, adminviewsGetRes) {
                // Handle Adminviews save error
                if (adminviewsGetErr) {
                  return done(adminviewsGetErr);
                }

                // Get Adminviews list
                var adminviews = adminviewsGetRes.body;

                // Set assertions
                (adminviews[0].user._id).should.equal(userId);
                (adminviews[0].name).should.match('Adminview name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Adminview if not logged in', function (done) {
    agent.post('/api/adminviews')
      .send(adminview)
      .expect(403)
      .end(function (adminviewSaveErr, adminviewSaveRes) {
        // Call the assertion callback
        done(adminviewSaveErr);
      });
  });

  it('should not be able to save an Adminview if no name is provided', function (done) {
    // Invalidate name field
    adminview.name = '';

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

        // Save a new Adminview
        agent.post('/api/adminviews')
          .send(adminview)
          .expect(400)
          .end(function (adminviewSaveErr, adminviewSaveRes) {
            // Set message assertion
            (adminviewSaveRes.body.message).should.match('Please fill Adminview name');

            // Handle Adminview save error
            done(adminviewSaveErr);
          });
      });
  });

  it('should be able to update an Adminview if signed in', function (done) {
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

        // Save a new Adminview
        agent.post('/api/adminviews')
          .send(adminview)
          .expect(200)
          .end(function (adminviewSaveErr, adminviewSaveRes) {
            // Handle Adminview save error
            if (adminviewSaveErr) {
              return done(adminviewSaveErr);
            }

            // Update Adminview name
            adminview.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Adminview
            agent.put('/api/adminviews/' + adminviewSaveRes.body._id)
              .send(adminview)
              .expect(200)
              .end(function (adminviewUpdateErr, adminviewUpdateRes) {
                // Handle Adminview update error
                if (adminviewUpdateErr) {
                  return done(adminviewUpdateErr);
                }

                // Set assertions
                (adminviewUpdateRes.body._id).should.equal(adminviewSaveRes.body._id);
                (adminviewUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Adminviews if not signed in', function (done) {
    // Create new Adminview model instance
    var adminviewObj = new Adminview(adminview);

    // Save the adminview
    adminviewObj.save(function () {
      // Request Adminviews
      request(app).get('/api/adminviews')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Adminview if not signed in', function (done) {
    // Create new Adminview model instance
    var adminviewObj = new Adminview(adminview);

    // Save the Adminview
    adminviewObj.save(function () {
      request(app).get('/api/adminviews/' + adminviewObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', adminview.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Adminview with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/adminviews/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Adminview is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Adminview which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Adminview
    request(app).get('/api/adminviews/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Adminview with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Adminview if signed in', function (done) {
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

        // Save a new Adminview
        agent.post('/api/adminviews')
          .send(adminview)
          .expect(200)
          .end(function (adminviewSaveErr, adminviewSaveRes) {
            // Handle Adminview save error
            if (adminviewSaveErr) {
              return done(adminviewSaveErr);
            }

            // Delete an existing Adminview
            agent.delete('/api/adminviews/' + adminviewSaveRes.body._id)
              .send(adminview)
              .expect(200)
              .end(function (adminviewDeleteErr, adminviewDeleteRes) {
                // Handle adminview error error
                if (adminviewDeleteErr) {
                  return done(adminviewDeleteErr);
                }

                // Set assertions
                (adminviewDeleteRes.body._id).should.equal(adminviewSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Adminview if not signed in', function (done) {
    // Set Adminview user
    adminview.user = user;

    // Create new Adminview model instance
    var adminviewObj = new Adminview(adminview);

    // Save the Adminview
    adminviewObj.save(function () {
      // Try deleting Adminview
      request(app).delete('/api/adminviews/' + adminviewObj._id)
        .expect(403)
        .end(function (adminviewDeleteErr, adminviewDeleteRes) {
          // Set message assertion
          (adminviewDeleteRes.body.message).should.match('User is not authorized');

          // Handle Adminview error error
          done(adminviewDeleteErr);
        });

    });
  });

  it('should be able to get a single Adminview that has an orphaned user reference', function (done) {
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

          // Save a new Adminview
          agent.post('/api/adminviews')
            .send(adminview)
            .expect(200)
            .end(function (adminviewSaveErr, adminviewSaveRes) {
              // Handle Adminview save error
              if (adminviewSaveErr) {
                return done(adminviewSaveErr);
              }

              // Set assertions on new Adminview
              (adminviewSaveRes.body.name).should.equal(adminview.name);
              should.exist(adminviewSaveRes.body.user);
              should.equal(adminviewSaveRes.body.user._id, orphanId);

              // force the Adminview to have an orphaned user reference
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

                    // Get the Adminview
                    agent.get('/api/adminviews/' + adminviewSaveRes.body._id)
                      .expect(200)
                      .end(function (adminviewInfoErr, adminviewInfoRes) {
                        // Handle Adminview error
                        if (adminviewInfoErr) {
                          return done(adminviewInfoErr);
                        }

                        // Set assertions
                        (adminviewInfoRes.body._id).should.equal(adminviewSaveRes.body._id);
                        (adminviewInfoRes.body.name).should.equal(adminview.name);
                        should.equal(adminviewInfoRes.body.user, undefined);

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
      Adminview.remove().exec(done);
    });
  });
});
