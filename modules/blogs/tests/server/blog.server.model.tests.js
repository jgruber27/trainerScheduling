'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  //User = mongoose.model('User', new mongoose.Schema()),
  Blog = mongoose.model('Blog');

/**
 * Globals
 */
var blog, blog_id;

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

  /*beforeEach(function(done) {
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
        user: user
      });

      done();C:\Users\James Gruber\Desktop\School Filing Cabinet\Software Engineering\trainerScheduling\modules\blogs\tests\serverC:\Users\James Gruber\Desktop\School Filing Cabinet\Software Engineering\trainerScheduling\modules\blogs\tests\serverC:\Users\James Gruber\Desktop\School Filing Cabinet\Software Engineering\trainerScheduling\modules\blogs\tests\serverC:\Users\James Gruber\Desktop\School Filing Cabinet\Software Engineering\trainerScheduling\modules\blogs\tests\server
    });
  });*/

  describe('Saving a blog to the database', function(done) {
    
    this.timeout(10000);

    it('should be able to save a new blog', function(done) {
      new Blog({
        name: 'title',
        content: 'content',
        video: '',
      }).save(function(err){
        should.not.exist(err);
        blog_id = blog._id;
        done();
      });
    });


    it('Should not save to the db if Blog title is not provided', function(done){
      new Blog({
        content: 'content',
        video: '',
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

  

  });

  /*afterEach(function(done) {
    Blog.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
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
});
