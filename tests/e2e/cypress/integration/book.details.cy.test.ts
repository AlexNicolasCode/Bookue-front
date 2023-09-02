import { faker } from "@faker-js/faker"

import { BookModel } from "../../../../src/domain/models"
import { GreaterThanFieldError } from "../../../../src/validation/errors"
import { mockCustomEndpoint, mockLoadBookEndpoint } from "../utils/start.fake.server"

describe('Book details screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    it('Should be redirected to sign in screen', () => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`, { failOnStatusCode: false })

        cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    let fakeBook: Partial<BookModel>

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
        mockLoadBookEndpoint(fakeBook)
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`)

        cy.getByTestId('book-details-title-field').should('have.text', fakeBook.title)
        cy.getByTestId('book-details-author-field').should('have.text', fakeBook.author)
        cy.getByTestId('book-details-description-field').should('have.text', fakeBook.description)
        cy.getByTestId('book-details-currentPage-field').should('have.text', fakeBook.currentPage)
        cy.getByTestId('book-details-pages-field').should('have.text', fakeBook.pages)
    })
    
    it('Should render correct book head title on success', () => {
        mockLoadBookEndpoint(fakeBook)
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`)

        cy.getByTestId('book-details-title').should('have.text', fakeBook.title)
    })
    
    it('Should render correct book progress percentage', () => {
        fakeBook.pages = faker.datatype.number({ max: 200 })
        mockLoadBookEndpoint(fakeBook)
        const fakeBookId = faker.datatype.uuid()
        const bookProcessPercentage = String((fakeBook.currentPage * 100) / fakeBook.pages).substring(0, 4);
        cy.visit(`/book/${fakeBookId}/`)

        cy.getByTestId('book-details-process-percentage').should('have.text', `${bookProcessPercentage}%`)
    })
    
    it('Should send to last screen when user click in back button', () => {
        mockCustomEndpoint({
            loadAllBooks: [fakeBook],
            loadBook: fakeBook,
        })
        cy.visit('/')
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/`)

        cy.getByTestId('header-back-book-button').click()

        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    describe('edit mode flow', () => {
        it('Should edit correctly title field when user click in edit button, type something and click in edit button again', () => {
            mockLoadBookEndpoint()
            const fakeText = faker.random.words()
            const fakeBookId = faker.datatype.uuid()
            cy.visit(`/book/${fakeBookId}/`)
    
            cy.getByTestId('book-details-title-field-edit-button').click()
            cy.getByTestId('book-details-title-field-edit-mode').clear()
            cy.getByTestId('book-details-title-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-title-field-edit-button').click()
            
            cy.getByTestId('book-details-title-field').should('have.text', fakeText)
        })

        it('Should edit correctly author field when user click in edit button, type something and click in edit button again', () => {
            mockLoadBookEndpoint()
            const fakeText = faker.random.words()
            const fakeBookId = faker.datatype.uuid()
            cy.visit(`/book/${fakeBookId}/`)
    
            cy.getByTestId('book-details-author-field-edit-button').click()
            cy.getByTestId('book-details-author-field-edit-mode').clear()
            cy.getByTestId('book-details-author-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-author-field-edit-button').click()
            
            cy.getByTestId('book-details-author-field').should('have.text', fakeText)
        })

        it('Should edit correctly description field when user click in edit button, type something and click in edit button again', () => {
            mockLoadBookEndpoint()
            const fakeText = faker.random.words()
            const fakeBookId = faker.datatype.uuid()
            cy.visit(`/book/${fakeBookId}/`)
    
            cy.getByTestId('book-details-description-field-edit-button').click()
            cy.getByTestId('book-details-description-field-edit-mode').clear()
            cy.getByTestId('book-details-description-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-description-field-edit-button').click()
            
            cy.getByTestId('book-details-description-field').should('have.text', fakeText)
        })

        it('Should edit correctly current page field when user click in edit button, type something and click in edit button again', () => {
            mockLoadBookEndpoint()
            const fakeText = `${fakeBook.pages - faker.datatype.number({ max: fakeBook.pages })}`
            const fakeBookId = faker.datatype.uuid()
            cy.visit(`/book/${fakeBookId}/`)
    
            cy.getByTestId('book-details-currentPage-field-edit-button').click()
            cy.getByTestId('book-details-currentPage-field-edit-mode').clear()
            cy.getByTestId('book-details-currentPage-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-currentPage-field-edit-button').click()
            
            cy.getByTestId('book-details-currentPage-field').should('have.text', fakeText)
        })

        it('Should edit correctly pages field when user click in edit button, type something and click in edit button again', () => {
            mockLoadBookEndpoint()
            const fakeText = faker.datatype.number().toString()
            const fakeBookId = faker.datatype.uuid()
            cy.visit(`/book/${fakeBookId}/`)
    
            cy.getByTestId('book-details-pages-field-edit-button').click()
            cy.getByTestId('book-details-pages-field-edit-mode').clear()
            cy.getByTestId('book-details-pages-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-pages-field-edit-button').click()
            
            cy.getByTestId('book-details-pages-field').should('have.text', fakeText)
        })

        it('Should show greater than error when user try save current page field greater than pages field', () => {
            mockLoadBookEndpoint()
            const fakeText = `${fakeBook.pages + faker.datatype.number()}`
            const fakeBookId = faker.datatype.uuid()
            const fakeError = new GreaterThanFieldError('current page', 'pages').message.toLowerCase()
            cy.visit(`/book/${fakeBookId}/`)

            cy.getByTestId('book-details-currentPage-field-edit-button').click()
            cy.getByTestId('book-details-currentPage-field-edit-mode').clear()
            cy.getByTestId('book-details-currentPage-field-edit-mode').type(fakeText)
            cy.getByTestId('book-details-currentPage-field-edit-button').click()
            
            cy.getByTestId('book-details-error-warn').should('have.text', fakeError)
        })
    })
  })
})
