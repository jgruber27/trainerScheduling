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

    // it('Should list requests if credentials are not missing', function () {
    //   browser.get('http://localhost:3000/requests');
    // });
    
    it('Test creating a new request', function () {
      //Creating a new request.
      browser.get('http://localhost:3000/requests/create');
      //Do not rely on async calls, its just directly interacts with the dom and inserts the keys into the input field.
      //browser.ignoreSynchronization = true;
      //browser.driver.findElement(protractor.By.id('name')).sendKeys('batman');

      element(by.css('vm.request.name')).sendKeys(request.name);

      //element(by.model('vm.request.name')).sendKeys(request.name);
      //element(by.model('vm.request.class')).sendKeys(request.class);
      //element(by.model('vm.request.shiftTime')).sendKeys(request.shiftTime);
      //element(by.model('vm.request.reason')).sendKeys(request.reason);
      element(by.css('.btn btn-default')).click();
      //element(by.id('class')).sendKeys(request.class);
      //element(by.id('shiftTime')).sendKeys(request.shiftTime);
      //element(by.id('reason')).sendKeys(request.reason);
      // element(by.css('#class')).sendKeys(request.class);
      // element(by.css('#shiftTime')).sendKeys(request.shiftTime);
      // element(by.css('#reason')).sendKeys(request.reason);
    });
      
  });
});
