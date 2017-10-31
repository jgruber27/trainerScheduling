(function () {
  'use strict';

  angular
    .module('requests')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Request Off',
      state: 'requests',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'requests', {
      title: 'List of Requests',
      state: 'requests.list'
      roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'requests', {
      title: 'Create Request',
      state: 'requests.create',
      roles: ['user']
    });
  }
}());
