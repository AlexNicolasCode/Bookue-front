import { faker } from "@faker-js/faker";

const bookueApiUrl = "http://localhost:8000/graphql"

describe('Sign in screen', () => {
  let fakeAccount;

  beforeEach(() => {
    cy.viewport('iphone-x')
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

  it('Should show invalid user error when user fill form with invalid data', () => {
    cy.intercept(bookueApiUrl, {
        method: 'POST',
      }, {
      statusCode: 401,
    }).as('request')
    cy.getByTestId('sign-in-email').type(fakeAccount.email)
    cy.getByTestId('sign-in-password').type(fakeAccount.password)
    cy.getByTestId('sign-in-submit-form').click()

    cy.getByTestId('sign-up-alert').contains('Invalid user. Please, check if your email and password is correct.')
  })

  it('Should redirect to home screen on success', () => {
    cy.intercept(bookueApiUrl, {
        method: 'POST',
      }, {
      statusCode: 200,
      body: {
        data: {
          login: {
            accessToken: faker.datatype.string(),
          }
        }
      }
    }).as('request')
    cy.getByTestId('sign-in-email').type(fakeAccount.email)
    cy.getByTestId('sign-in-password').type(fakeAccount.password)
    cy.getByTestId('sign-in-submit-form').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})