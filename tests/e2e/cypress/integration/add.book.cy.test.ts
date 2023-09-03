describe('Add Book screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    it('Should redirect to sign in screen', () => {
        cy.visit('/book/add/', { failOnStatusCode: false })

        cy.url().should('include', '/login')
    })
  })
})
