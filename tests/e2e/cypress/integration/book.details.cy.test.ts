import { faker } from "@faker-js/faker"

import { mockBook } from "../../../data/mocks/mock.book"
import { BookModel } from "../../../../src/domain/models"

describe('Book details screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    beforeEach(() => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`)
    })

    it('Should be redirected to sign in screen', () => {
        cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
        cy.setCookie('bookue-user', 'any_token')
    })
    
    it('Should redirect to home screen when book was not found', () => {
        cy.task('startServer', {
            baseUrl: '/graphql',
            statusCode: 404,
            body: {}
        })
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('Should redirect to home screen when server side broken when try load book', () => {
        cy.task('startServer', {
            baseUrl: '/graphql',
            statusCode: 500,
            body: {}
        })
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
    
    it('Should render correct book fields on success', () => {
        const book: BookModel = mockBook()
        cy.task('startServer', {
            baseUrl: '/graphql',
            statusCode: 200,
            body: {
                data: {
                    loadBook: book
                }
            }
        })
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })
        cy.getByTestId('book-details-title-field').should('have.text', book.title)
        cy.getByTestId('book-details-author-field').should('have.text', book.author)
        cy.getByTestId('book-details-description-field').should('have.text', book.description)
        cy.getByTestId('book-details-current-page-field').should('have.text', book.currentPage)
        cy.getByTestId('book-details-pages-field').should('have.text', book.pages)
    })
    
    it('Should render correct book head title on success', () => {
        const book: BookModel = mockBook()
        cy.task('startServer', {
            baseUrl: '/graphql',
            statusCode: 200,
            body: {
                data: {
                    loadBook: book
                }
            }
        })
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })
        cy.getByTestId('book-details-title').should('have.text', book.title)
    })
  })
})