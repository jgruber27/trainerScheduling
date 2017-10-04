'use strict';

module.exports = function(app) {
  // Routing logic   
  var blog = require('../controllers/trainer.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
  router.route('/blog')
  .get(blog.list);

  module.exports = router;
};



