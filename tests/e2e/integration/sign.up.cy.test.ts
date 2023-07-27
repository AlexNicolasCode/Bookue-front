import { faker } from "@faker-js/faker"

describe('Sign up screen', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })
  
  it('Should change to login page when click in login button', () => {
      cy.visit('/sign-up')
  
      cy.getByTestId('login-button').click()
      cy.url().should('include', '/login')
  })

  it('Should change to login page when click in login button', () => {
    cy.visit('/sign-up')

    cy.getByTestId('login-button').click()
    cy.url().should('include', '/login')
})
})