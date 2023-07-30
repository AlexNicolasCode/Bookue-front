describe('Home screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should be redirected to sign in screen', () => {
      cy.url().should('include', '/login')
    })
  })
})
