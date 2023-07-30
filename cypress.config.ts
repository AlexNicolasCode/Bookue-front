import express from "express"
import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/cypress/integration/*.cy.test.ts",
    supportFile: "tests/e2e/cypress/support",
    fixturesFolder: "tests/e2e/cypress/fixtures",
    setupNodeEvents(on, config) {      
      let server

      on('task', {
        startServer({ baseUrl, statusCode, body }) {
          if (server) server.close() 
          const app = express()
          app.post(baseUrl, (req, res) => {
            res.status(statusCode).send(body)
          })
          server = app.listen(8000)
          return null
        },

        closeServer() {
          server.close()
          return null
        }
      })
    }
  },
  env: {
    baseApiURL: 'http://localhost:8000/graphql/',
  }
})