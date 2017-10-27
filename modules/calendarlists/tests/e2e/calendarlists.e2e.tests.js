'use strict';

describe('Calendarlists E2E Tests:', function () {
  describe('Test Calendarlists page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/calendarlists');
      expect(element.all(by.repeater('calendarlist in calendarlists')).count()).toEqual(0);
    });
  });
});
