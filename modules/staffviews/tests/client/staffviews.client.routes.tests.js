(function () {
  'use strict';

  describe('Staffviews Route Tests', function () {
    // Initialize global variables
    var $scope,
      StaffviewsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _StaffviewsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      StaffviewsService = _StaffviewsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('staffviews');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/staffviews');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          StaffviewsController,
          mockStaffview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('staffviews.view');
          $templateCache.put('modules/staffviews/client/views/view-staffview.client.view.html', '');

          // create mock Staffview
          mockStaffview = new StaffviewsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Staffview Name'
          });

          // Initialize Controller
          StaffviewsController = $controller('StaffviewsController as vm', {
            $scope: $scope,
            staffviewResolve: mockStaffview
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:staffviewId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.staffviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            staffviewId: 1
          })).toEqual('/staffviews/1');
        }));

        it('should attach an Staffview to the controller scope', function () {
          expect($scope.vm.staffview._id).toBe(mockStaffview._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/staffviews/client/views/view-staffview.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          StaffviewsController,
          mockStaffview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('staffviews.create');
          $templateCache.put('modules/staffviews/client/views/form-staffview.client.view.html', '');

          // create mock Staffview
          mockStaffview = new StaffviewsService();

          // Initialize Controller
          StaffviewsController = $controller('StaffviewsController as vm', {
            $scope: $scope,
            staffviewResolve: mockStaffview
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.staffviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/staffviews/create');
        }));

        it('should attach an Staffview to the controller scope', function () {
          expect($scope.vm.staffview._id).toBe(mockStaffview._id);
          expect($scope.vm.staffview._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/staffviews/client/views/form-staffview.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          StaffviewsController,
          mockStaffview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('staffviews.edit');
          $templateCache.put('modules/staffviews/client/views/form-staffview.client.view.html', '');

          // create mock Staffview
          mockStaffview = new StaffviewsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Staffview Name'
          });

          // Initialize Controller
          StaffviewsController = $controller('StaffviewsController as vm', {
            $scope: $scope,
            staffviewResolve: mockStaffview
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:staffviewId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.staffviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            staffviewId: 1
          })).toEqual('/staffviews/1/edit');
        }));

        it('should attach an Staffview to the controller scope', function () {
          expect($scope.vm.staffview._id).toBe(mockStaffview._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/staffviews/client/views/form-staffview.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
