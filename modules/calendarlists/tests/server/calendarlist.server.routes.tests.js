'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Calendarlist = mongoose.model('Calendarlist'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  calendarlist;

/**
 * Calendarlist routes tests
 */
describe('Calendarlist CRUD tests', function () {

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

    // Save a user to the test db and create new Calendarlist
    user.save(function () {
      calendarlist = {
        name: 'Calendarlist name'
      };

      done();
    });
  });

  it('should be able to save a Calendarlist if logged in', function (done) {
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

        // Save a new Calendarlist
        agent.post('/api/calendarlists')
          .send(calendarlist)
          .expect(200)
          .end(function (calendarlistSaveErr, calendarlistSaveRes) {
            // Handle Calendarlist save error
            if (calendarlistSaveErr) {
              return done(calendarlistSaveErr);
            }

            // Get a list of Calendarlists
            agent.get('/api/calendarlists')
              .end(function (calendarlistsGetErr, calendarlistsGetRes) {
                // Handle Calendarlists save error
                if (calendarlistsGetErr) {
                  return done(calendarlistsGetErr);
                }

                // Get Calendarlists list
                var calendarlists = calendarlistsGetRes.body;

                // Set assertions
                (calendarlists[0].user._id).should.equal(userId);
                (calendarlists[0].name).should.match('Calendarlist name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Calendarlist if not logged in', function (done) {
    agent.post('/api/calendarlists')
      .send(calendarlist)
      .expect(403)
      .end(function (calendarlistSaveErr, calendarlistSaveRes) {
        // Call the assertion callback
        done(calendarlistSaveErr);
      });
  });

  it('should not be able to save an Calendarlist if no name is provided', function (done) {
    // Invalidate name field
    calendarlist.name = '';

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

        // Save a new Calendarlist
        agent.post('/api/calendarlists')
          .send(calendarlist)
          .expect(400)
          .end(function (calendarlistSaveErr, calendarlistSaveRes) {
            // Set message assertion
            (calendarlistSaveRes.body.message).should.match('Please fill Calendarlist name');

            // Handle Calendarlist save error
            done(calendarlistSaveErr);
          });
      });
  });

  it('should be able to update an Calendarlist if signed in', function (done) {
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

        // Save a new Calendarlist
        agent.post('/api/calendarlists')
          .send(calendarlist)
          .expect(200)
          .end(function (calendarlistSaveErr, calendarlistSaveRes) {
            // Handle Calendarlist save error
            if (calendarlistSaveErr) {
              return done(calendarlistSaveErr);
            }

            // Update Calendarlist name
            calendarlist.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Calendarlist
            agent.put('/api/calendarlists/' + calendarlistSaveRes.body._id)
              .send(calendarlist)
              .expect(200)
              .end(function (calendarlistUpdateErr, calendarlistUpdateRes) {
                // Handle Calendarlist update error
                if (calendarlistUpdateErr) {
                  return done(calendarlistUpdateErr);
                }

                // Set assertions
                (calendarlistUpdateRes.body._id).should.equal(calendarlistSaveRes.body._id);
                (calendarlistUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Calendarlists if not signed in', function (done) {
    // Create new Calendarlist model instance
    var calendarlistObj = new Calendarlist(calendarlist);

    // Save the calendarlist
    calendarlistObj.save(function () {
      // Request Calendarlists
      request(app).get('/api/calendarlists')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Calendarlist if not signed in', function (done) {
    // Create new Calendarlist model instance
    var calendarlistObj = new Calendarlist(calendarlist);

    // Save the Calendarlist
    calendarlistObj.save(function () {
      request(app).get('/api/calendarlists/' + calendarlistObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', calendarlist.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Calendarlist with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/calendarlists/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Calendarlist is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Calendarlist which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Calendarlist
    request(app).get('/api/calendarlists/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Calendarlist with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Calendarlist if signed in', function (done) {
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

        // Save a new Calendarlist
        agent.post('/api/calendarlists')
          .send(calendarlist)
          .expect(200)
          .end(function (calendarlistSaveErr, calendarlistSaveRes) {
            // Handle Calendarlist save error
            if (calendarlistSaveErr) {
              return done(calendarlistSaveErr);
            }

            // Delete an existing Calendarlist
            agent.delete('/api/calendarlists/' + calendarlistSaveRes.body._id)
              .send(calendarlist)
              .expect(200)
              .end(function (calendarlistDeleteErr, calendarlistDeleteRes) {
                // Handle calendarlist error error
                if (calendarlistDeleteErr) {
                  return done(calendarlistDeleteErr);
                }

                // Set assertions
                (calendarlistDeleteRes.body._id).should.equal(calendarlistSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Calendarlist if not signed in', function (done) {
    // Set Calendarlist user
    calendarlist.user = user;

    // Create new Calendarlist model instance
    var calendarlistObj = new Calendarlist(calendarlist);

    // Save the Calendarlist
    calendarlistObj.save(function () {
      // Try deleting Calendarlist
      request(app).delete('/api/calendarlists/' + calendarlistObj._id)
        .expect(403)
        .end(function (calendarlistDeleteErr, calendarlistDeleteRes) {
          // Set message assertion
          (calendarlistDeleteRes.body.message).should.match('User is not authorized');

          // Handle Calendarlist error error
          done(calendarlistDeleteErr);
        });

    });
  });

  it('should be able to get a single Calendarlist that has an orphaned user reference', function (done) {
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

          // Save a new Calendarlist
          agent.post('/api/calendarlists')
            .send(calendarlist)
            .expect(200)
            .end(function (calendarlistSaveErr, calendarlistSaveRes) {
              // Handle Calendarlist save error
              if (calendarlistSaveErr) {
                return done(calendarlistSaveErr);
              }

              // Set assertions on new Calendarlist
              (calendarlistSaveRes.body.name).should.equal(calendarlist.name);
              should.exist(calendarlistSaveRes.body.user);
              should.equal(calendarlistSaveRes.body.user._id, orphanId);

              // force the Calendarlist to have an orphaned user reference
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

                    // Get the Calendarlist
                    agent.get('/api/calendarlists/' + calendarlistSaveRes.body._id)
                      .expect(200)
                      .end(function (calendarlistInfoErr, calendarlistInfoRes) {
                        // Handle Calendarlist error
                        if (calendarlistInfoErr) {
                          return done(calendarlistInfoErr);
                        }

                        // Set assertions
                        (calendarlistInfoRes.body._id).should.equal(calendarlistSaveRes.body._id);
                        (calendarlistInfoRes.body.name).should.equal(calendarlist.name);
                        should.equal(calendarlistInfoRes.body.user, undefined);

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
      Calendarlist.remove().exec(done);
    });
  });
});
