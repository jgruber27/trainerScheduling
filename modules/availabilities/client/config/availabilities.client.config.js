(function () {
  'use strict';

  angular
    .module('availabilities')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Availabilities',
      state: 'availabilities',
      type: 'dropdown',
      roles: ['user','admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'availabilities', {
      title: 'View Availability',
      state: 'availabilities.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'availabilities', {
      title: 'Update Availability',
      state: 'availabilities.create',
      roles: ['user']
    });
  }
}());
