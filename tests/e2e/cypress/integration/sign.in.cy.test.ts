import { faker } from "@faker-js/faker";

import { mockLoadAllBooksEndpoint } from "../utils/start.fake.server";
import { RequiredFieldError } from "../../../../src/validation/errors";
import { InvalidUserError } from "../../../../src/domain/errors";

const bookueApiUrl = "http://localhost:8000/graphql"

describe('Sign in screen', () => {
  let fakeAccount;

  beforeEach(() => {
    cy.viewport('iphone-x')
    fakeAccount = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })

  it('Should change to sign up page when click in sign up button', () => {
    cy.visit('/login')

    cy.getByTestId('sign-up-button').click()

    cy.url().should('include', '/login')
  })

  it('Should show required field error when user not fill password field', () => {
    const requiredFieldError = new RequiredFieldError().message
    cy.visit('/login')

    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
  })

  it('Should show required field error when user not fill email field', () => {
    const requiredFieldError = new RequiredFieldError().message
    cy.visit('/login')
    
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
  })

  it('Should show invalid user error when user fill form with invalid data', () => {
    const requiredFieldError = new InvalidUserError().message
    cy.visit('/login')
    cy.intercept(bookueApiUrl, {
        method: 'POST',
      }, {
      statusCode: 401,
    }).as('request')
    
    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
  })

  it('Should redirect to home screen on success', () => {
    cy.visit('/login')
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

    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    mockLoadAllBooksEndpoint()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('Should show password when user click in show password icon', () => {
    cy.visit('/login')
    const passwordField = cy.getByTestId('password-field')

    passwordField.type(fakeAccount.password)
    cy.getByTestId('password-icon-view').click()

    passwordField.invoke('attr', 'type').should('eq', 'text')
  })
  
  it('Should hide password when user click in hide password icon', () => {
    cy.visit('/login')
    const passwordField = cy.getByTestId('password-field')
    
    cy.getByTestId('password-icon-view').click()
    passwordField.type(fakeAccount.password)
    cy.getByTestId('password-icon-view').click()

    passwordField.invoke('attr', 'type').should('eq', 'password')
  })
})
