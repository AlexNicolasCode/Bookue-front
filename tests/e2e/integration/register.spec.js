 describe('Register Test', () => {  
    it('Change to login page', () => {
        cy.visit('/register')
    
        cy.get('header button').click()
        cy.url().should('include', '/login')
    })

    it('visits the app root url', () => {
        cy.visit('/register')
        cy.get('input[name*="name"]').type('testing')
        cy.get('input[name*="email"]').type(`${Math.random() * 10}@test.com`)
        cy.get('input[name*="password"]').type('testing')
        cy.get('form button').click()
        cy.url().should('include', '/')
      })
  })
  