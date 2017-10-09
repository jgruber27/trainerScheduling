(function () {
  'use strict';

  angular
    .module('staffviews')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Staffviews',
      state: 'staffviews',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'staffviews', {
      title: 'List Staffviews',
      state: 'staffviews.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'staffviews', {
      title: 'Create Staffview',
      state: 'staffviews.create',
      roles: ['user']
    });

    menuService.addSubMenuItem('topbar', 'staffviews', {
      title: 'Something',
      state: 'staffviews.requestoff',
      roles: ['user']
    });
  }
}());
