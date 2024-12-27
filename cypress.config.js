const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  screenshotOnRunFailure: false,
  failFast: false,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: [
      'cypress/e2e/login.test.js',
      'cypress/e2e/bypassing_to_main_pages.test.js',
      'cypress/e2e/cart.test.js',
      'cypress/e2e/checkout.test.js'
    ],
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
});
