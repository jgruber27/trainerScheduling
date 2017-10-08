(function() {
  'use strict';

  // Schedules controller
  angular.module('schedules').controller('SchedulesController', SchedulesController);

  SchedulesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'scheduleResolve'];

  function SchedulesController($scope, $state, $window, Authentication, schedule) {

    var vm = this;

    vm.authentication = Authentication;
    vm.schedule = schedule;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    /*function createEvent() {
      var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2017-10-08T20:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2017-10-08T23:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': ['RRULE:FREQ=DAILY;COUNT=2'],
        'attendees': [
          {
            'email': 'lpage@example.com'
          }, {
            'email': 'sbrin@example.com'
          }
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {
              'method': 'email',
              'minutes': 24 * 60
            }, {
              'method': 'popup',
              'minutes': 10
            }
          ]
        }
      };

      calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created: %s', event.htmlLink);
      });
    }*/

    function events() {
      var fs = require('fs');
      var readline = require('readline');
      var google = require('googleapis');
      var GoogleAuth = require('google-auth-library');
      var auth = new GoogleAuth();
      // If modifying these scopes, delete your previously saved credentials
      // at ~/.credentials/calendar-nodejs-quickstart.json
      var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
      var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
          process.env.USERPROFILE) + '/.credentials/';
      var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

      // Load client secrets from a local file.
      fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Calendar API.
        authorize(JSON.parse(content), listEvents);
      });
      function authorize(credentials, callback) {
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        //var auth = new GoogleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function(err, token) {
          if (err) {
            getNewToken(oauth2Client, callback);
          } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
          }
        });
      }
      function getNewToken(oauth2Client, callback) {
        var authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
          rl.close();
          oauth2Client.getToken(code, function(err, token) {
            if (err) {
              console.log('Error while trying to retrieve access token', err);
              return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
          });
        });
      }

      /**
       * Store token to disk be used in later program executions.
       *
       * @param {Object} token The token to store to disk.
       */
      function storeToken(token) {
        try {
          fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
          if (err.code !== 'EEXIST') {
            throw err;
          }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
      }

      var calendar = google.calendar('v3');

      addEvents(auth, calendar); // Add events
      removeEvents(auth, calendar); // Remove events

      function listEvents(auth) {
        var calendar = google.calendar('v3');
        calendar.events.list({
          auth: auth,
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime'
        }, function(err, response) {
          if (err) {
            console.log('The API returned an error: ' + err);
            return;
          }
          var events = response.items;
          if (events.length === 0) {
            console.log('No upcoming events found.');
          } else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              var start = event.start.dateTime || event.start.date;
              console.log('%s - %s', start, event.summary);
            }
          }
        });
      }

      function addEvents(auth, calendar) {
        calendar.events.insert({
          auth: auth,
          calendarId: 'primary',
          resource: {
            'summary': 'Sample Event',
            'description': 'Sample description',
            'start': {
              'dateTime': '2017-01-01T00:00:00',
              'timeZone': 'GMT'
            },
            'end': {
              'dateTime': '2017-01-01T01:00:00',
              'timeZone': 'GMT'
            }
          }
        }, function(err, res) {
          if (err) {
            console.log('Error: ' + err);
            return;
          }
          console.log(res);
        });
      }

      function removeEvents(auth, calendar) {
        calendar.events.delete({
          auth: auth,
          calendarId: 'primary',
          eventId: '#####'
        }, function(err) {
          if (err) {
            console.log('Error: ' + err);
            return;
          }
          console.log('Removed');
        });
      }
    }
    // Remove existing Schedule
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.schedule.$remove($state.go('schedules.list'));
      }
    }

    // Save Schedule
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.scheduleForm');
        return false;
      }
      eventss();
      function eventss() {
        var fs = require('fs');
        var readline = require('readline');
        var google = require('googleapis');
        var GoogleAuth = require('google-auth-library');
        var auth = new GoogleAuth();
        // If modifying these scopes, delete your previously saved credentials
        // at ~/.credentials/calendar-nodejs-quickstart.json
        var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
        var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
            process.env.USERPROFILE) + '/.credentials/';
        var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

        // Load client secrets from a local file.
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
          if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
          }
          // Authorize a client with the loaded credentials, then call the
          // Google Calendar API.
          authorize(JSON.parse(content), listEvents);
        });
        function authorize(credentials, callback) {
          var clientSecret = credentials.installed.client_secret;
          var clientId = credentials.installed.client_id;
          var redirectUrl = credentials.installed.redirect_uris[0];
          //var auth = new GoogleAuth();
          var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
              getNewToken(oauth2Client, callback);
            } else {
              oauth2Client.credentials = JSON.parse(token);
              callback(oauth2Client);
            }
          });
        }
        function getNewToken(oauth2Client, callback) {
          var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
          });
          console.log('Authorize this app by visiting this url: ', authUrl);
          var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
              if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
              }
              oauth2Client.credentials = token;
              storeToken(token);
              callback(oauth2Client);
            });
          });
        }

        /**
         * Store token to disk be used in later program executions.
         *
         * @param {Object} token The token to store to disk.
         */
        function storeToken(token) {
          try {
            fs.mkdirSync(TOKEN_DIR);
          } catch (err) {
            if (err.code !== 'EEXIST') {
              throw err;
            }
          }
          fs.writeFile(TOKEN_PATH, JSON.stringify(token));
          console.log('Token stored to ' + TOKEN_PATH);
        }

        var calendar = google.calendar('v3');

        addEvents(auth, calendar); // Add events
        removeEvents(auth, calendar); // Remove events

        function listEvents(auth) {
          var calendar = google.calendar('v3');
          calendar.events.list({
            auth: auth,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
          }, function(err, response) {
            if (err) {
              console.log('The API returned an error: ' + err);
              return;
            }
            var events = response.items;
            if (events.length === 0) {
              console.log('No upcoming events found.');
            } else {
              console.log('Upcoming 10 events:');
              for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
              }
            }
          });
        }

        function addEvents(auth, calendar) {
          calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: {
              'summary': 'Sample Event',
              'description': 'Sample description',
              'start': {
                'dateTime': '2017-01-01T00:00:00',
                'timeZone': 'GMT'
              },
              'end': {
                'dateTime': '2017-01-01T01:00:00',
                'timeZone': 'GMT'
              }
            }
          }, function(err, res) {
            if (err) {
              console.log('Error: ' + err);
              return;
            }
            console.log(res);
          });
        }

        function removeEvents(auth, calendar) {
          calendar.events.delete({
            auth: auth,
            calendarId: 'primary',
            eventId: '#####'
          }, function(err) {
            if (err) {
              console.log('Error: ' + err);
              return;
            }
            console.log('Removed');
          });
        }
      }

      // TODO: move create/update logic to service
      if (vm.schedule._id) {
        vm.schedule.$update(successCallback, errorCallback);
      } else {
        vm.schedule.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schedules.view', { scheduleId: res._id });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
