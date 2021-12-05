 describe('Login Test', () => {
  it('Redirect to login page', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })

  it('Change to register page', () => {
    cy.visit('/login')

    cy.get('header button').click()
    cy.url().should('include', '/register')
  })

  it('Login user', () => {
    cy.visit('/login')
    cy.get('input[name*="email"]').type('testing@test.com')
    cy.get('input[name*="password"]').type('testing')
    cy.get('form button').click()

    cy.url().should('equal', 'http://localhost:3000/')
  })
})
