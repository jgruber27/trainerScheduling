(function () {
  'use strict';

  angular
    .module('trainer')
    .directive('trainer', trainer);

  trainer.$inject = [/*Example: '$state', '$window' */];

  function trainer(/*Example: $state, $window */) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Trainer directive logic
        // ...

        element.text('this is the trainer directive');
      }
    };
  }
})();
