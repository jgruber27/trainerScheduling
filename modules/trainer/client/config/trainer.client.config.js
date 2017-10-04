(function() {
  'use strict';

  // Trainer module config
  angular
    .module('trainer')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
  }
})();
