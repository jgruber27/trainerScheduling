(function () {
  'use strict';

  angular
    .module('calendarviews')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Calendarviews',
      state: 'calendarviews',
      type: 'dropdown',
      roles: ['user','admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'calendarviews', {
      title: 'List Calendarviews',
      state: 'calendarviews.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'calendarviews', {
      title: 'Create Calendarview',
      state: 'calendarviews.create',
      roles: ['user','admin']
    });
  }
}());
