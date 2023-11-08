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

      it('Should delete note when user, on delete mode, select some note on delete button', () => {
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

        cy.getByTestId(`notes-remove-note-button`).first().click()

        cy.getByTestId('notes-note-card-delete-mode').should('have.length', notes.length - 1)
      })

      it('Should open add note input when user click on add mode button', () => {
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`)
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [...mockNoteList()]
            }
          }
        })

        cy.getByTestId('notes-add-mode-button').click()

        cy.getByTestId('notes-add-note-input').should('exist')
      })

      it('Should not save note when user type blank text in add mode and click on add mode button again', () => {
        const fakeBookId = faker.datatype.uuid()
        const notes = mockNoteList()
        cy.visit(`/book/${fakeBookId}/notes`)
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [...notes],
            }
          }
        })
        
        cy.getByTestId('notes-add-mode-button').click()
        cy.getByTestId('notes-add-note-input').type(" ")
        cy.getByTestId('notes-add-mode-button').click()
        
        cy.getByTestId('notes-note-card').should('have.length', notes.length)
      })

      it('Should save note when user type some text in add mode and click on add mode button again', () => {
        const fakeBookId = faker.datatype.uuid()
        const fakeNoteText = faker.random.words()
        cy.visit(`/book/${fakeBookId}/notes`)
        cy.task('startServer', {
          baseUrl: '/graphql',
          statusCode: 200,
          body: {
            data: {
              loadNotes: [],
            }
          }
        })
        cy.intercept(Cypress.env().baseApiURL, {
          method: 'POST',
        }, {
          statusCode: 200,
          body: {
            data: { loadNotes: [{ id: faker.datatype.uuid(), text: fakeNoteText }] }
          }
        }).as('request')
        
        cy.getByTestId('notes-add-mode-button').click()
        cy.getByTestId('notes-add-note-input').type(fakeNoteText)
        cy.getByTestId('notes-add-mode-button').click()
        
        cy.getByTestId('notes-note-card').first().contains(fakeNoteText)
      })
    })
})
