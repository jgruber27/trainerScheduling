'use strict';

describe('Availabilities E2E Tests:', function () {
  describe('Test Availabilities page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/availabilities');
      expect(element.all(by.repeater('availability in availabilities')).count()).toEqual(0);
    });
  });
});
