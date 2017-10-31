'use strict';

describe('Calendarviews E2E Tests:', function () {
  describe('Test Calendarviews page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/calendarviews');
      expect(element.all(by.repeater('calendarview in calendarviews')).count()).toEqual(0);
    });
  });
});
