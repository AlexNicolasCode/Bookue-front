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
        setServerConfig({ baseUrl, statusCode, body }) {
          server = express()
          server.post(baseUrl, (req, res) => {
            res.status(statusCode).send(body)
          })
          return null
        },

        startServer() {
          if (!server) return
          server.listen(8000)
          return null
        },

        closeServer() {
          if (!server) return
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