import { faker } from "@faker-js/faker"

import { mockLoadAllBooksEndpoint } from "../utils/start.fake.server";

describe('Sign up screen', () => {
  let fakeAccount;

  beforeEach(() => {
    cy.viewport('iphone-x')
    fakeAccount = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  
  it('Should change to login page when click in login button', () => {
    cy.visit('/sign-up')

    cy.getByTestId('login-button').click()

    cy.url().should('include', '/login')
  })

  it('Should show password error alert when user fill password and password confirmation field with diferent values', () => {
    cy.visit('/sign-up')

    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(faker.internet.password())
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('alert-message').contains('Invalid password fields comparation')
  })
  
  it('Should show password error alert when user not fill password confirmation field', () => {
    cy.visit('/sign-up')
    
    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('alert-message').contains('Invalid password fields comparation')
  })

  it('Should show required field error when user not fill name field', () => {
    cy.visit('/sign-up')

    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('alert-message').contains('Required Field')
  })

  it('Should show required field error when user not fill email field', () => {
    cy.visit('/sign-up')

    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('alert-message').contains('Required Field')
  })

  it('Should show required field error when user not fill password field', () => {
    cy.visit('/sign-up')

    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    cy.getByTestId('alert-message').contains('Required Field')
  })

  it('Should redirect to home screen on success', () => {
    cy.visit('/sign-up')
    cy.intercept(Cypress.env("baseApiURL"), {
      method: 'POST',
      }, {
      statusCode: 200,
      body: {
        data: {
          signUp: {
            accessToken: faker.datatype.string(),
          }
        }
      }
    }).as('request')

    cy.getByTestId('sign-up-name').type(fakeAccount.name)
    cy.getByTestId('sign-up-email').type(fakeAccount.email)
    cy.getByTestId('sign-up-password').type(fakeAccount.password)
    cy.getByTestId('sign-up-password-confirmation').type(fakeAccount.password)
    cy.getByTestId('sign-up-submit-form').click()

    mockLoadAllBooksEndpoint()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})