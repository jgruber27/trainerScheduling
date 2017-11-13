'use strict';

describe('Requests E2E Tests:', function () {
  var test_request = {
    name: 'Time off - E2E testing',
    user: 'Lisbe',
    shiftTime: 'October 31st, 1-3pm',
    created: 'October 30th',
    class: 'Gymnastics',
    reason: 'New class',
  };

  var user_admin = {
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris5175@ufl.edu',
    username: 'chris5175',
    password: 'Password1234!',
    roles: 'admin'
  };

  var user_staff = {
    firstName: 'Lisbeth',
    lastName: 'Cardoso',
    email: 'lisbecg@gmail.com',
    username: 'lisbecg',
    password: 'P@ssword123',
    roles: 'user'
  };

  var signin = function(user){
    browser.get('http://localhost:3000/authentication/signin');
    //Enter username
    element(by.model('credentials.username')).sendKeys(user.username);
    //Enter password
    element(by.model('credentials.password')).sendKeys(user.password);
    // Click Submit button
    element(by.css('button[type="submit"]')).click();
  };

  var signout = function () {
    // Sign out user.
    browser.get('http://localhost:3000/authentication/signout');
    // Delete cookies.
    //browser.driver.manage().deleteAllCookies();
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
      //Make sure user is signed in.
      signin(user_admin);
      browser.waitForAngular();
      browser.sleep(2000);

      //Creating a new request.
      browser.get('http://localhost:3000/requests/create');
      browser.waitForAngular();
      browser.sleep(2000);

      element(by.model('vm.request.name')).sendKeys(test_request.name);
      element(by.model('vm.request.class')).sendKeys(test_request.class);
      element(by.model('vm.request.shiftTime')).sendKeys(test_request.shiftTime);
      element(by.model('vm.request.reason')).sendKeys(test_request.reason);
      //Click the button to create the request.
      element(by.css('button[type="submit"]')).click();
      browser.waitForAngular();

      //Check that it goes to the right link.
      browser.get('http://localhost:3000/requests/*');
      browser.waitForAngular();

      // Make sure user is signed out
      //signout();
    });

    // it('Accept request and go to calendar', function () {
    //   //TODO: Fix this and pass the ID - Ask Kurt!!
    //   browser.get('http://localhost:3000/requests/' + myRequest._id);
    //
    //   element(by.css('[ng-click="vm.removeAndGoToCalendar()"]')).click();
    //   browser.sleep(4000);
    //
    //   //TODO: Check for popup
    //
    //   browser.get('http://localhost:3000/schedules');
    //   browser.sleep(4000);
    // });
    //
    // it('Decline and delete request', function () {
    //   browser.get('http://localhost:3000/requests/' + myRequest._id);
    //
    //   element(by.css('[ng-click="vm.remove()"]')).click();
    //   browser.sleep(4000);
    //
    //   //TODO: Check for popup
    //
    //   browser.get('http://localhost:3000/requests');
    //   browser.sleep(4000);
    // });
      
  });
});
