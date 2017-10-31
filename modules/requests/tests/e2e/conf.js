exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['requests.e2e.tests.js'],

  jasmineNodeOpts: { showColors: true }
};
