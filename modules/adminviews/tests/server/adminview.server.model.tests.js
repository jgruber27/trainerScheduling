'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Adminview = mongoose.model('Adminview');

/**
 * Globals
 */
var user, adminview;

/**
 * Unit tests
 */
describe('Adminview Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      adminview = new Adminview({
        name: 'adminviewName'
      });

      done();
    });
  });


  it('should be able to save without problems', function (done) {
    this.timeout(10000);
    return adminview.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('should be able to show an error when try to save without title', function (done) {
    adminview.name = '';

    return adminview.save(function (err) {
      should.exist(err);
      done();
    });
  });

  afterEach(function (done) {
    Adminview.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});