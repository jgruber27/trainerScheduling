'use strict';

describe('Requests E2E Tests:', function () {
  var request = {
    name: 'Time off - E2E testing',
    user: 'Lisbe',
    shiftTime: 'October 31st, 1-3pm',
    created: 'October 30th',
    class: 'Gymnastics',
    reason: 'New class',
  };

  describe('Test Requests page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/requests');
      expect(element.all(by.repeater('request in requests')).count()).toEqual(0);
    });

    it('Should report missing fields', function () {
      browser.get('http://localhost:3000/requests/create');
      // Click Submit button
      element(by.css('button[type="submit"]')).click();
      // Request Name Error
      expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Request name is required.');
      // Class Name Error
      expect(element.all(by.css('.error-text')).get(1).getText()).toBe('Class name is required.');
      // Shift Time Error
      expect(element.all(by.css('.error-text')).get(2).getText()).toBe('Shift Time is required.');
      // Reason Error
      expect(element.all(by.css('.error-text')).get(3).getText()).toBe('Reason is required.');
    });

    // it('Should list requests if credentials are not missing', function () {
    //   browser.get('http://localhost:3000/requests');
    // });
    
    it('Test creating a new request', function () {
      //Creating a new request.
      browser.get('http://localhost:3000/requests/create');
      //Do not rely on async calls, its just directly interacts with the dom and inserts the keys into the input field.
      //browser.ignoreSynchronization = true;
      //browser.driver.findElement(protractor.By.id('name')).sendKeys('batman');
      browser.waitForAngular();
      element(by.model('vm.request.name')).sendKeys(request.name);
      element(by.model('vm.request.class')).sendKeys(request.class);
      element(by.model('vm.request.shiftTime')).sendKeys(request.shiftTime);
      element(by.model('vm.request.reason')).sendKeys(request.reason);
      //Click the button to create the request.
      element(by.css('.btn btn-default')).click();
      //browser.sleep(4000);
      browser.waitForAngular();
      //Check that it goes to the right link.
      browser.get('http://localhost:3000/requests/' + request._id);
      browser.waitForAngular();
      //element(by.id('class')).sendKeys(request.class);
      //element(by.id('shiftTime')).sendKeys(request.shiftTime);
      //element(by.id('reason')).sendKeys(request.reason);
      // element(by.css('#class')).sendKeys(request.class);
      // element(by.css('#shiftTime')).sendKeys(request.shiftTime);
      // element(by.css('#reason')).sendKeys(request.reason);
    });

    it('Accept request and go to calendar', function () {
      //TODO: Fix this and pass the ID - Ask Kurt!!
      browser.get('http://localhost:3000/requests/' + request._id);

      element(by.css('[ng-click="vm.removeAndGoToCalendar()"]')).click();
      browser.sleep(4000);

      //TODO: Check for popup

      browser.get('http://localhost:3000/schedules');
      browser.sleep(4000);
    });

    it('Decline and delete request', function () {
      browser.get('http://localhost:3000/requests/' + request._id);

      element(by.css('[ng-click="vm.remove()"]')).click();
      browser.sleep(4000);

      //TODO: Check for popup

      browser.get('http://localhost:3000/requests');
      browser.sleep(4000);
    });
      
  });
});
