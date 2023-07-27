import { faker } from "@faker-js/faker"

describe('Sign up screen', () => {
  let fakeAccount;

  beforeEach(() => {
    cy.visit('/sign-up')
    fakeAccount = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  
  it('Should change to login page when click in login button', () => {
      cy.getByTestId('login-button').click()

      cy.url().should('include', '/login')
  })

  it('Should show password error alert when user fill password and password confirmation field with diferent values', () => {
    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(faker.internet.password())
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Invalid password fields comparation')
  })

  it('Should show required field error when user not fill name field', () => {
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Required Field')
  })

  it('Should show required field error when user not fill email field', () => {
    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Required Field')
  })
})