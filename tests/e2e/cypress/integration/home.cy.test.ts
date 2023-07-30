import { mockBook } from "../../../data/mocks/mock.book"

describe('Home screen', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  describe('when not authenticated', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Should be redirected to sign in screen', () => {
      cy.url().should('include', '/login')
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
      cy.setCookie('bookue-user', 'any_token')
    })
  
    afterEach(() => {
      cy.task('closeServer')
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
  })
})
