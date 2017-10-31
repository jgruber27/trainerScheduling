'use strict';

describe('Staffviews E2E Tests:', function () {
  describe('Test Staffviews page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/staffviews');
      expect(element.all(by.repeater('staffview in staffviews')).count()).toEqual(0);
    });
  });
});
