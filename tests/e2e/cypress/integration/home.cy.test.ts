import { mockBook } from "../../../data/mocks/mock.book"
import { BookModel } from "../../../../src/domain/models"

describe('Home screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {    
    it('Should be redirected to sign in screen', () => {
      cy.visit('/')

      cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
      cy.setCookie('bookue-user', 'any_token')
    })

    it('Should show empty state when none book was found', () => {
      cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: {
            loadAllBooks: []
          }
        }
      })
      cy.visit('/')

      cy.getByTestId('home-empty-state').contains('Not found')
    })

    it('Should show correct books list when access home and any book', () => {
      const fakeBooks: BookModel[] = [mockBook(), mockBook(), mockBook()]
      cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: {
            loadAllBooks: fakeBooks
          }
        }
      })
      cy.visit('/')

      cy.getByTestId('home-book-card').each(($element, index) => {
        const card = cy.wrap($element)
        const equivalentBookFromApi = fakeBooks[index]
        card.getByTestId('home-book-title').contains(equivalentBookFromApi.title)
        card.getByTestId('home-book-pages').contains(
          `${equivalentBookFromApi.currentPage} - ${equivalentBookFromApi.pages}`
        )
        card.getByTestId('home-book-description').contains(equivalentBookFromApi.description)
      })
    })

    it('Should redirect book details screen when user click in details button', () => {
      const fakeBook: BookModel = mockBook()
      cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: {
            loadAllBooks: [fakeBook]
          }
        }
      })
      cy.visit('/')
      
      cy.getByTestId('home-book-details-button').click()

      cy.url().should('include', `/book/${fakeBook.id}`)
    })

    it('Should redirect add book screen when user click in add book button', () => {
      cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: {
            loadAllBooks: []
          }
        }
      })
      cy.visit('/')
      
      cy.getByTestId('header-add-book-button').click()

      cy.url().should('include', '/book/add')
    })

    it('Should redirect book notes screen when user click in notes button', () => {
      const fakeBook: BookModel = mockBook()
      cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: {
            loadAllBooks: [fakeBook]
          }
        }
      })
      cy.visit('/')

      cy.getByTestId('home-book-notes-button').click()

      cy.url().should('include', `/book/${fakeBook.id}/note`)
    })
  })
})
