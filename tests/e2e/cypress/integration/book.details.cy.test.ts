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
})
