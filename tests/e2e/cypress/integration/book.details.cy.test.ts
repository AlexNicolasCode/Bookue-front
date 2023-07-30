import { faker } from "@faker-js/faker"

describe('Book details screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    beforeEach(() => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`)
    })

    it('Should be redirected to sign in screen', () => {
        cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
        cy.setCookie('bookue-user', 'any_token')
    })
    
    it('Should redirect to home screen when book was not found', () => {
        cy.task('startServer', {
            baseUrl: '/graphql',
            statusCode: 404,
            body: {}
        })
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})
