# Swag Labs - Automation Testing with Cypress

This project focuses on enhancing my skills in end-to-end (E2E) test automation using Cypress. The test cases are developed based on those I previously created in Spreadsheet, Trello, and Jira. Additionally, the defect reports have been documented on Trello.

## Features

- **Page Object Model (POM)**: Enhances test maintainability by reusing page components.
- **Custom Reporting**: Uses **JUnit** for structured results and **Mochawesome** for detailed visual reports.

## Project Sources

Below is a table of sources used for this project, including test scenarios, cases, and defect reports:

| **Source**          | **Description**                                  | **URL**                                                                                                     |
|----------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Swag Labs**        | The application under test.                     | [Swag Labs](https://www.saucedemo.com/)                                                                     |
| **Test Scenarios**   | Trello board documenting the test scenarios.    | [View on Trello](https://trello.com/invite/b/670f2e3a03f362e09e2abb63/ATTI78fe058e2b7c53a4dc9f7198a9f9980947A758DC/writing-test-scenarios-training) |
| **Test Cases**       | Spreadsheet containing manually written cases.  | [View Test Cases](https://docs.google.com/spreadsheets/d/1OjMEX_3Wncul7BSHx7h771NHyIB7UPB02REYRP6j0rw/edit?usp=sharing)                              |
| **Defect/Bug Report**| Spreadsheet with logged defects.                | [View Defect Report](https://docs.google.com/spreadsheets/d/1qnoyH_dbMEtcT6uUFbC2IdJrSmD-cM_3uhimOrDz_Qg/edit?usp=sharing)              |

## Tech Stack

This project utilizes the following technologies and tools:

- **Code Editor**: VS Code
- **Node.js**: v22.11.0
- **NPM**: v10.9.0
- **Cypress**: v13.5.2
- **Browser**: Google Chrome


## Installation

**Install the dependencies**.
```sh
npm i --force
```

**Run E2E and merge the reports**.
```sh
npm run cypress:e2e
```

**Run on a browser (optional)**.
```sh
npx cypress open
```

