'use strict';

describe('Adminviews E2E Tests:', function () {
  describe('Test Adminviews page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/adminviews');
      expect(element.all(by.repeater('adminview in adminviews')).count()).toEqual(0);
    });
  });
});
