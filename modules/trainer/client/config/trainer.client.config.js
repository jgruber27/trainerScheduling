(function() {
  'use strict';

  // Trainer module config
  angular
    .module('trainer')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Home',
      state: 'trainer',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'trainer', {
      title: 'Staff Home Page',
      state: 'home',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'trainer', {
      title: 'Admin Home Page',
      state: 'homeadmin',
      roles: ['admin']
    });
  }
}());
