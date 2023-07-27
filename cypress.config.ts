import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/integration/*.cy.test.ts",
    supportFile: "tests/e2e/support"
  },
})