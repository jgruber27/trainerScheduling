(function () {
  'use strict';

  angular
    .module('homes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Homes',
      state: 'homes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'homes', {
      title: 'List Homes',
      state: 'homes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'homes', {
      title: 'Create Home',
      state: 'homes.create',
      roles: ['user']
    });
  }
}());
