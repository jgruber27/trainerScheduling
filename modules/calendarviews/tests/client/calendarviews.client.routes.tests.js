(function () {
  'use strict';

  describe('Calendarviews Route Tests', function () {
    // Initialize global variables
    var $scope,
      CalendarviewsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CalendarviewsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CalendarviewsService = _CalendarviewsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('calendarviews');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/calendarviews');
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
          CalendarviewsController,
          mockCalendarview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('calendarviews.view');
          $templateCache.put('modules/calendarviews/client/views/view-calendarview.client.view.html', '');

          // create mock Calendarview
          mockCalendarview = new CalendarviewsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Calendarview Name'
          });

          // Initialize Controller
          CalendarviewsController = $controller('CalendarviewsController as vm', {
            $scope: $scope,
            calendarviewResolve: mockCalendarview
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:calendarviewId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.calendarviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            calendarviewId: 1
          })).toEqual('/calendarviews/1');
        }));

        it('should attach an Calendarview to the controller scope', function () {
          expect($scope.vm.calendarview._id).toBe(mockCalendarview._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/calendarviews/client/views/view-calendarview.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CalendarviewsController,
          mockCalendarview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('calendarviews.create');
          $templateCache.put('modules/calendarviews/client/views/form-calendarview.client.view.html', '');

          // create mock Calendarview
          mockCalendarview = new CalendarviewsService();

          // Initialize Controller
          CalendarviewsController = $controller('CalendarviewsController as vm', {
            $scope: $scope,
            calendarviewResolve: mockCalendarview
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.calendarviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/calendarviews/create');
        }));

        it('should attach an Calendarview to the controller scope', function () {
          expect($scope.vm.calendarview._id).toBe(mockCalendarview._id);
          expect($scope.vm.calendarview._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/calendarviews/client/views/form-calendarview.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CalendarviewsController,
          mockCalendarview;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('calendarviews.edit');
          $templateCache.put('modules/calendarviews/client/views/form-calendarview.client.view.html', '');

          // create mock Calendarview
          mockCalendarview = new CalendarviewsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Calendarview Name'
          });

          // Initialize Controller
          CalendarviewsController = $controller('CalendarviewsController as vm', {
            $scope: $scope,
            calendarviewResolve: mockCalendarview
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:calendarviewId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.calendarviewResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            calendarviewId: 1
          })).toEqual('/calendarviews/1/edit');
        }));

        it('should attach an Calendarview to the controller scope', function () {
          expect($scope.vm.calendarview._id).toBe(mockCalendarview._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/calendarviews/client/views/form-calendarview.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
