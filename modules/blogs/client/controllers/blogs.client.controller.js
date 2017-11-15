(function () {
  'use strict';

  // Blogs controller
  angular
    .module('blogs')
    .controller('BlogsController', BlogsController);

  BlogsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'blogResolve', '$sce'];

  function BlogsController ($scope, $state, $window, Authentication, blog, $sce) {
    var vm = this;

    vm.authentication = Authentication;
    vm.blog = blog;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
    // Remove existing Blog
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.blog.$remove($state.go('blogs.list'));
      }
    }

    // Save Blog
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.blogForm');
        return false;
      }

      /*if(vm.blog.video){
        for(var i = 0; i < vm.blog.video.length; i++){
          if(vm.blog.video[i] == '='){
            i++;
            vm.blog.video = "http://www.youtube.com/embed/" + vm.blog.video.substring(i);
          }
        }
      }*/
      if(vm.blog.video){
        var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
        vm.blog.video = vm.blog.video.replace(re, 'http://www.youtube.com/embed/$1');
      }
      // TODO: move create/update logic to service
      if (vm.blog._id) {
        vm.blog.$update(successCallback, errorCallback);
      } else {
        vm.blog.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('blogs.view', {
          blogId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
