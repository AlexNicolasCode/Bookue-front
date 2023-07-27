describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should change to sign up page when click in sign up button', () => {
    cy.getByTestId('sign-up-button').click()

    cy.url().should('include', '/login')
  })
})
