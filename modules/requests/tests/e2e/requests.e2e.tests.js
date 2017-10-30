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

    it('Should list requests if credentials are not missing', function () {
      browser.get('http://localhost:3000/requests');
    });
    
    it('Test creating a new request', function () {
      //Creating a new request.
      browser.get('http://localhost:3000/requests/create');

      // element(by.css('#name')).sendKeys(request.name);
      // element(by.css('#class')).sendKeys(request.class);
      // element(by.css('#shiftTime')).sendKeys(request.shiftTime);
      // element(by.css('#reason')).sendKeys(request.reason);
    });
      
  });
});
