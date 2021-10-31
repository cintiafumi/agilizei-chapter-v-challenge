# ⚡️ Chapter V - Challenge 03

Cypress automation testing of a [platform to share articles](https://demo.realworld.io/#/).

## 📝 Requirements

- assess Sign in feature using different scenarios
- understand the behavior of the application (API, responses, etc.)
- UI and end-to-end testing
- add assertions to the tests
- generate reports using mochawesome
- create a new repository to Github
- describe the project in a README file
- run tests in Github Actions
- report deployment at Github Pages

## ⚙️ Setup Project

Init a new Node.js project:

```bash
  npm init -y
```

Install `Cypress`, `ESlint`, `Mochawesome` and `rimraf` as dev dependency:

```bash
  npm install -D cypress eslint eslint-plugin-cypress eslint-plugin-chai-friendly cypress-multi-reporters mochawesome mochawesome-merge mochawesome-report-generator rimraf

```

Run Cypress:

```bash
  npx cypress open
```

Delete boilerplate files.

Init ESlint:

```bash
$ npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
✔ What format do you want your config file to be in? · JSON
✔ Would you like to install them now with npm? · No / Yes
```

Add a new reporter configuration file `reporter-config.json`:

```json
{
  "reporterEnabled": "mochawesome",
  "mochawesomeReporterOptions": {
    "reportDir": "mochawesome-report",
    "quiet": true,
    "overwrite": false,
    "html": false,
    "json": true
  }
}
```

Add a schema, change the `integrationFolder`, add `baseUrl` and the reporter configuration to the `cypress.json`:

```json
{
  "$schema": "https://on.cypress.io/cypress.schema.json",
  "integrationFolder": "cypress/tests",
  "baseUrl": "https://demo.realworld.io/#/",
  "videoCompression": 32,
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
    "configFile": "reporter-config.json"
  }
}
```

Add scripts commands to the `package.json` file:

```json
{
  "scripts": {
    "cy:open": "npx cypress open",
    "cy:run": "npx cypress run",
    "lint": "eslint --fix **/*.js",
    "report:merge": "mochawesome-merge > index.json",
    "report:mocha": "marge index.json",
    "report:clean": "rimraf mochawesome-report index.json"
  }
}
```

## 🎥 Testing

Run the browser test:

```bash
  npm run cy:open
```

Or run the headless test to record the video:

```bash
  npm run cy:run
```

### Sign in Page Testing
<img src="./signin.gif" alt="sign in page testing">

### Articles Page Testing
<img src="./articles.gif" alt="articles page testing">
