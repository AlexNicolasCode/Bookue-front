import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/cypress/integration/*.cy.test.ts",
    supportFile: "tests/e2e/cypress/support",
    fixturesFolder: "tests/e2e/cypress/fixtures"
  },
  env: {
    baseApiURL: 'http://localhost:8000/graphql',
  }
})