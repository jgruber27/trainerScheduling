(function () {
  'use strict';

  angular
    .module('ex')
    .directive('ex', ex);

  ex.$inject = [/*Example: '$state', '$window' */];

  function ex(/*Example: $state, $window */) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Ex directive logic
        // ...

        element.text('this is the ex directive');
      }
    };
  }
})();
