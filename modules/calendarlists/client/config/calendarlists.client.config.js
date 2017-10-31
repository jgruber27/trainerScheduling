(function () {
  'use strict';

  angular
    .module('calendarlists')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    /* NOT NEEDED ATM
    menuService.addMenuItem('topbar', {
      title: 'Calendarlists',
      state: 'calendarlists',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'calendarlists', {
      title: 'List Calendarlists',
      state: 'calendarlists.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'calendarlists', {
      title: 'Create Calendarlist',
      state: 'calendarlists.create',
      roles: ['admin']
    });
    */
  }
}());
