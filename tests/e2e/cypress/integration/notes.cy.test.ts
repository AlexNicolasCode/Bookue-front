import { faker } from "@faker-js/faker"

import { mockNoteList } from "../../../domain/mocks"

describe('Notes screen', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    describe('when not authenticated', () => {
      it('Should redirect to sign in screen', () => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`, { failOnStatusCode: false })

        cy.url().should('include', '/login')
      })
    })

    describe('when authenticated', () => {
      beforeEach(() => {
        cy.setCookie('bookue-user', 'any_token')
      })

      it('Should render correct notes quantity', () => {
        const notes = mockNoteList()
        const fakeBookId = faker.datatype.uuid()
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [...notes]
            }
          }
        })
        cy.visit(`/book/${fakeBookId}/notes`)

        cy.getByTestId('notes-note-card').should('have.length', notes.length)
      })

      it('Should change to delete mode when user click in delete mode icon', () => {
        const notes = mockNoteList()
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`)
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [...notes]
            }
          }
        })

        cy.getByTestId('notes-delete-mode-button').click()

        cy.getByTestId('notes-note-card-delete-mode').should('have.length', notes.length)
      })

      it('Should back to default mode when user click on delete mode button when delete mode is already activeted', () => {
        const notes = mockNoteList()
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`)
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [...notes]
            }
          }
        })
        const deleteModeButton = cy.getByTestId('notes-delete-mode-button')
        deleteModeButton.click()

        deleteModeButton.click()

        cy.getByTestId('notes-note-card').should('have.length', notes.length)
      })
    })
})
