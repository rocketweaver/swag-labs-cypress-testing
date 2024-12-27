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
    specPattern: ['cypress/e2e/**/*.test.{js,jsx,ts,tsx}'],
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
});
