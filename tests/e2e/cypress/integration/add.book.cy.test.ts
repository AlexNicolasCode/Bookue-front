import { faker } from "@faker-js/faker"

import { GreaterThanFieldError, RequiredFieldError } from "../../../../src/validation/errors"
import { AlertMessage } from "../../../../src/presentation/contexts"
import { mockLoadAllBooksEndpoint } from "../utils/start.fake.server"

describe('Add Book screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    it('Should redirect to sign in screen', () => {
        cy.visit('/book/add/', { failOnStatusCode: false })

        cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    let fakeBook

    beforeEach(() => {
      fakeBook = {
        title: faker.random.words(),
        author: faker.random.words(),
        description: faker.random.words(),
        currentPage: faker.datatype.number({ max: 10 }),
        pages: faker.datatype.number({ min: 50 }),
      }
      cy.setCookie('bookue-user', 'any_token')
    })

    it('Should see required field error alert when submit form without fill title field', () => {
      const requiredFieldError = new RequiredFieldError().message
      cy.visit('/book/add/')

      cy.getByTestId('book-add-submit-form').click()

      cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
    })

    it('Should see required field error alert when submit form without fill pages field', () => {
      const requiredFieldError = new RequiredFieldError().message
      cy.visit('/book/add/')

      cy.getByTestId('book-add-title-field').type(fakeBook.title)
      cy.getByTestId('book-add-submit-form').click()

      cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
    })

    it('Should see required field error alert when submit form without fill description field', () => {
      const requiredFieldError = new RequiredFieldError().message
      cy.visit('/book/add/')

      cy.getByTestId('book-add-title-field').type(fakeBook.title)
      cy.getByTestId('book-add-pages-field').type(fakeBook.pages)
      cy.getByTestId('book-add-submit-form').click()

      cy.getByTestId('alert-message').contains(requiredFieldError, { matchCase: false })
    })

    it('Should greater than field error alert when submit form after fill currentPage field with a number with more than pages field value', () => {
      const greaterThanFieldError = new GreaterThanFieldError('current page', 'pages').message
      fakeBook.currentPage = fakeBook.pages + faker.datatype.number({ min: 1 })
      cy.visit('/book/add/')

      cy.getByTestId('book-add-title-field').type(fakeBook.title)
      cy.getByTestId('book-add-pages-field').type(fakeBook.pages)
      cy.getByTestId('book-add-description-field').type(fakeBook.description)
      cy.getByTestId('book-add-currentPage-field').type(fakeBook.currentPage)
      cy.getByTestId('book-add-submit-form').click()

      cy.getByTestId('alert-message').contains(greaterThanFieldError, { matchCase: false })
    })

    it('Should show generic error alert when some problem happen when requests was did', () => {
      mockLoadAllBooksEndpoint()
      cy.intercept(Cypress.env().baseApiURL, {
          method: 'POST',
        }, {
        statusCode: 500,
      }).as('request')
      cy.visit('/book/add/')

      cy.getByTestId('book-add-title-field').type(fakeBook.title)
      cy.getByTestId('book-add-pages-field').type(fakeBook.pages)
      cy.getByTestId('book-add-description-field').type(fakeBook.description)
      cy.getByTestId('book-add-submit-form').click()

      cy.getByTestId('alert-message').contains(AlertMessage.GenericError, { matchCase: false })
    })

    it('Should return to home after save book', () => {
      mockLoadAllBooksEndpoint()
      cy.intercept(Cypress.env().baseApiURL, {
          method: 'POST',
        }, {
        statusCode: 200,
      }).as('request')
      cy.visit('/book/add/')

      cy.getByTestId('book-add-title-field').type(fakeBook.title)
      cy.getByTestId('book-add-pages-field').type(fakeBook.pages)
      cy.getByTestId('book-add-description-field').type(fakeBook.description)
      cy.getByTestId('book-add-submit-form').click()

      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})
