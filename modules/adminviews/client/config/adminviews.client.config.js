(function () {
  'use strict';

  angular
    .module('adminviews')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Admin View',
      state: 'adminviews',
      type: 'dropdown',
      roles: ['admin']
    });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'adminviews', {
    //   title: 'List Adminviews',
    //   state: 'adminviews.list'
    // });
    //
    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'adminviews', {
    //   title: 'Create Adminview',
    //   state: 'adminviews.create',
    //   roles: ['user']
    // });
    // Add the dropdown My Admin View
    menuService.addSubMenuItem('topbar', 'adminviews', {
      title: 'My Main Admin View',
      state: 'adminviews.main_view',
      roles: ['admin']
    });
  }
}());
