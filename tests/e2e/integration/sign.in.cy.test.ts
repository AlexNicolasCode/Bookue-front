import { faker } from "@faker-js/faker";

describe('Sign in screen', () => {
  let fakeAccount;

  beforeEach(() => {
    cy.visit('/login')
    fakeAccount = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })

  it('Should change to sign up page when click in sign up button', () => {
    cy.getByTestId('sign-up-button').click()

    cy.url().should('include', '/login')
  })

  it('Should show required field error when user not fill password field', () => {
    cy.getByTestId('sign-in-email').type(fakeAccount.email)
    cy.getByTestId('sign-in-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Required Field')
  })

  it('Should show required field error when user not fill email field', () => {
    cy.getByTestId('sign-in-password').type(fakeAccount.password)
    cy.getByTestId('sign-in-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Required Field')
  })
})
