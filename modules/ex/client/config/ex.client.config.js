(function() {
  'use strict';

  // Ex module config
  angular
    .module('ex')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
  }
})();
