import { faker } from "@faker-js/faker"

describe('Notes screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    it('Should redirect to sign in screen', () => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`, { failOnStatusCode: false })

        cy.url().should('include', '/login')
    })
  })
})
