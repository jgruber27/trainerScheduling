'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Blog = mongoose.model('Blog');

/**
 * Globals
 */

var user, blog, blog_id;


blog = {
  name: 'title',
  content: 'content',
  video: '',
};
/**
 * Unit tests
 */
describe('Blog Model Unit Tests:', function() {

  this.timeout(10000);


  beforeEach(function(done) {

    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      blog = new Blog({
        name: 'Blog Name',
        content: 'Blog content',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function(done) {
    

    it('should be able to save a new blog', function(done) {
      this.timeout(10000);
      return blog.save(function(err){
        should.not.exist(err);
        blog_id = blog._id;
        done();
      });
    });

    it('Should not save to the db if Blog name is not provided', function(done){
      blog.name = '';

      return blog.save(function(err){
        should.exist(err);
        done();
      });
    });

  

  });

  /*afterEach(function(done) {
    Blog.remove().exec(function() {
      User.remove().exec(done);
    });
  });*/
  afterEach(function(done){
    if(blog_id){
      Blog.remove({ _id: blog_id }).exec(function(){
        blog_id = null;
        done();
      });
    } else{
      done();
    }
  });
  /*afterEach(function(done){
    if(blog_id){
      Blog.remove({ _id: blog_id }).exec(function(){
        blog_id = null;
        done();
      });
    } else{
      done();
    }
  });*/
});



