(function () {
  'use strict';

  describe('Availabilities Route Tests', function () {
    // Initialize global variables
    var $scope,
      AvailabilitiesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AvailabilitiesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AvailabilitiesService = _AvailabilitiesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('availabilities');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/availabilities');
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
          AvailabilitiesController,
          mockAvailability;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('availabilities.view');
          $templateCache.put('modules/availabilities/client/views/view-availability.client.view.html', '');

          // create mock Availability
          mockAvailability = new AvailabilitiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Availability Name'
          });

          // Initialize Controller
          AvailabilitiesController = $controller('AvailabilitiesController as vm', {
            $scope: $scope,
            availabilityResolve: mockAvailability
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:availabilityId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.availabilityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            availabilityId: 1
          })).toEqual('/availabilities/1');
        }));

        it('should attach an Availability to the controller scope', function () {
          expect($scope.vm.availability._id).toBe(mockAvailability._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/availabilities/client/views/view-availability.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AvailabilitiesController,
          mockAvailability;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('availabilities.create');
          $templateCache.put('modules/availabilities/client/views/form-availability.client.view.html', '');

          // create mock Availability
          mockAvailability = new AvailabilitiesService();

          // Initialize Controller
          AvailabilitiesController = $controller('AvailabilitiesController as vm', {
            $scope: $scope,
            availabilityResolve: mockAvailability
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.availabilityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/availabilities/create');
        }));

        it('should attach an Availability to the controller scope', function () {
          expect($scope.vm.availability._id).toBe(mockAvailability._id);
          expect($scope.vm.availability._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/availabilities/client/views/form-availability.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AvailabilitiesController,
          mockAvailability;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('availabilities.edit');
          $templateCache.put('modules/availabilities/client/views/form-availability.client.view.html', '');

          // create mock Availability
          mockAvailability = new AvailabilitiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Availability Name'
          });

          // Initialize Controller
          AvailabilitiesController = $controller('AvailabilitiesController as vm', {
            $scope: $scope,
            availabilityResolve: mockAvailability
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:availabilityId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.availabilityResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            availabilityId: 1
          })).toEqual('/availabilities/1/edit');
        }));

        it('should attach an Availability to the controller scope', function () {
          expect($scope.vm.availability._id).toBe(mockAvailability._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/availabilities/client/views/form-availability.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
