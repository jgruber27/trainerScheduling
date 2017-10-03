(function() {
  'use strict';

  angular
    .module('ex')
    .controller('ExController', ExController);

  ExController.$inject = ['$scope'];

  function ExController($scope) {
    var vm = this;

    // Ex controller logic
    // ...

    init();

    function init() {
    }
  }
})();
