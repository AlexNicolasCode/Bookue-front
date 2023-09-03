import { faker } from "@faker-js/faker"
import { RequiredFieldError } from "../../../../src/validation/errors"

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
  })
})
