import { faker } from "@faker-js/faker"

import { mockLoadAllBooksEndpoint } from "../utils/start.fake.server";
import { InvalidFieldError, RequiredFieldError } from "../../../../src/validation/errors";

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
    const invalidPasswordComparationError = new InvalidFieldError('password fields comparation').message
    cy.visit('/sign-up')

    cy.getByTestId('name-field').type(fakeAccount.name)
    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('passwordConfirmation-field').type(faker.internet.password())
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(invalidPasswordComparationError, { matchCase: false })
  })
  
  it('Should show password error alert when user not fill password confirmation field', () => {
    cy.visit('/sign-up')
    
    cy.getByTestId('name-field').type(fakeAccount.name)
    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains('Invalid password fields comparation')
  })

  it('Should show required field error when user not fill name field', () => {
    const requiredFieldError = new RequiredFieldError().message
    cy.visit('/sign-up')

    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('passwordConfirmation-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
  })

  it('Should show required field error when user not fill email field', () => {
    const requiredFieldError = new RequiredFieldError().message
    cy.visit('/sign-up')

    cy.getByTestId('name-field').type(fakeAccount.name)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('passwordConfirmation-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
  })

  it('Should show required field error when user not fill password field', () => {
    const requiredFieldError = new RequiredFieldError().message
    cy.visit('/sign-up')

    cy.getByTestId('name-field').type(fakeAccount.name)
    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('passwordConfirmation-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
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

    cy.getByTestId('name-field').type(fakeAccount.name)
    cy.getByTestId('email-field').type(fakeAccount.email)
    cy.getByTestId('password-field').type(fakeAccount.password)
    cy.getByTestId('passwordConfirmation-field').type(fakeAccount.password)
    cy.getByTestId('submit-form-button').click()

    mockLoadAllBooksEndpoint()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})