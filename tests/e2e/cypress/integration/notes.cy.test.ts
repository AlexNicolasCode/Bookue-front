import { faker } from "@faker-js/faker"

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
        const notesCount = 6
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`)

        cy.getByTestId('notes-note-card').should('have.length', notesCount)
      })

      it('Should change to delete mode when user click in delete mode icon', () => {
        const notesCount = 6
        const fakeBookId = faker.datatype.uuid()
        cy.visit(`/book/${fakeBookId}/notes`)

        cy.getByTestId('notes-delete-mode-button').click()

        cy.getByTestId('notes-note-card-delete-mode').should('have.length', notesCount)
      })
    })
})
