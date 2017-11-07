(function () {
  'use strict';

  angular
    .module('calendarviews')
    .controller('CalendarviewsListController', CalendarviewsListController);

  CalendarviewsListController.$inject = ['$scope','CalendarviewsService'];

  function CalendarviewsListController($scope,CalendarviewsService) {
    var vm = this;
    var entry;
    vm.calendarviews = CalendarviewsService.query().sort('start');
    vm.calendarview = CalendarviewsService.query().$promise.then(function (result) {
      //vm.calendarviews = CalendarviewsService.query();
    //for(var i =0;i<result.length;i++){
      //alert(JSON.stringify(result[0]));
      //alert(result[0]._displayName);
      //alert(result[0]._id._id);
      //alert(result[0]._id);
    //}
      $scope.data = result;

    });


  }
}());
