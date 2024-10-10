# Quick Start

### Install Dependencies

`npm install`

### Install browsers

`npx playwright install`

# Run Tests

All the UI tests for demoqa.com are present in : e2e/uiTest.spec.ts
All the API tests are present in file : e2e/apiTest.spec.ts

`npx playwright test`

or

`npm run test`

---


## About

## List all test titles

`npx playwright test --list`

---

## File Structure

    .
    ├── e2e                     # Project
    │   ├── apiTest.spec.ts     # API Tests
    │   ├── uiTest.spec.ts      # UI Tests
    ├── lib                     # Fixtures and Base Classes
    |── pages                   # Page object classes of the SauceDemo website
    |── testData                # Test Data
    |── .env                    # Environment variables for global access
    |── .gitignore              # Ignore files for Git compare
    ├── package.json            # Project metadata
    ├── package-lock.json       # Describes dependency tree
    ├── playwright.config.ts    # Playwright test configuration
    └── README.md               # This file
