(function () {
  'use strict';

  describe('Calendarlists Route Tests', function () {
    // Initialize global variables
    var $scope,
      CalendarlistsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CalendarlistsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CalendarlistsService = _CalendarlistsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('calendarlists');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/calendarlists');
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
          CalendarlistsController,
          mockCalendarlist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('calendarlists.view');
          $templateCache.put('modules/calendarlists/client/views/view-calendarlist.client.view.html', '');

          // create mock Calendarlist
          mockCalendarlist = new CalendarlistsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Calendarlist Name'
          });

          // Initialize Controller
          CalendarlistsController = $controller('CalendarlistsController as vm', {
            $scope: $scope,
            calendarlistResolve: mockCalendarlist
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:calendarlistId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.calendarlistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            calendarlistId: 1
          })).toEqual('/calendarlists/1');
        }));

        it('should attach an Calendarlist to the controller scope', function () {
          expect($scope.vm.calendarlist._id).toBe(mockCalendarlist._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/calendarlists/client/views/view-calendarlist.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CalendarlistsController,
          mockCalendarlist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('calendarlists.create');
          $templateCache.put('modules/calendarlists/client/views/form-calendarlist.client.view.html', '');

          // create mock Calendarlist
          mockCalendarlist = new CalendarlistsService();

          // Initialize Controller
          CalendarlistsController = $controller('CalendarlistsController as vm', {
            $scope: $scope,
            calendarlistResolve: mockCalendarlist
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.calendarlistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/calendarlists/create');
        }));

        it('should attach an Calendarlist to the controller scope', function () {
          expect($scope.vm.calendarlist._id).toBe(mockCalendarlist._id);
          expect($scope.vm.calendarlist._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/calendarlists/client/views/form-calendarlist.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CalendarlistsController,
          mockCalendarlist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('calendarlists.edit');
          $templateCache.put('modules/calendarlists/client/views/form-calendarlist.client.view.html', '');

          // create mock Calendarlist
          mockCalendarlist = new CalendarlistsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Calendarlist Name'
          });

          // Initialize Controller
          CalendarlistsController = $controller('CalendarlistsController as vm', {
            $scope: $scope,
            calendarlistResolve: mockCalendarlist
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:calendarlistId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.calendarlistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            calendarlistId: 1
          })).toEqual('/calendarlists/1/edit');
        }));

        it('should attach an Calendarlist to the controller scope', function () {
          expect($scope.vm.calendarlist._id).toBe(mockCalendarlist._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/calendarlists/client/views/form-calendarlist.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
