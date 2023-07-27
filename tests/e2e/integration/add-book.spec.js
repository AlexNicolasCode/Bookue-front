describe('Add Book Test', () => {
    beforeEach('Login user', () => {
      cy.visit('/login')
      cy.get('input[name*="email"]').type('testing@test.com')
      cy.get('input[name*="password"]').type('testing')
      cy.get('form button').click()
      cy.url().should('equal', 'http://localhost:3000/')
    })

    it('Change to add book page', () => {    
        cy.get('svg[class*="header__addTask"]').click()
        cy.url().should('include', '/add-book')
    })

    it('error current page plus than all pages', () => {
        cy.visit('/add-book')

        const book = {
            title: `${Math.random() * 100}`,
            author: `${Math.random() * 100}`,
            pages: 100,
            description: `${Math.random() * 100}`
        }

        cy.get('input[name*=title]').type(book.title)
        cy.get('input[name*=author]').type(book.author)
        cy.get('input[name*=pages]').type(book.pages)
        cy.get('textarea[name*=description]').type(book.description)
        cy.get('form button').click()
        
        cy.get('input[name*=currentPage]').type(1000)
        cy.get('input[name*=currentPage]').type(1000)
        cy.get('button[type="submit"]').click()

        cy.get('label').contains('Please, set the current page of book')
        cy.url().should('equal', 'http://localhost:3000/add-book')
    })

    it('add a new book', () => { 
        cy.visit('/add-book')

        const book = {
            title: `${Math.random() * 100}`,
            author: `${Math.random() * 100}`,
            pages: 100,
            description: `${Math.random() * 100}`
        }

        cy.get('input[name*=title]').type(book.title)
        cy.get('input[name*=author]').type(book.author)
        cy.get('input[name*=pages]').type(book.pages)
        cy.get('textarea[name*=description]').type(book.description)
        cy.get('form button').click()
        
        cy.get('input[name*=currentPage]').type(10)
        cy.get('button[type="submit"]').click()
        
        cy.url().should('equal', 'http://localhost:3000/')
        cy.get('h2[class*="book__title"]').first().contains(book.title)
        cy.get('h3[class*="book__author"]').first().contains(book.author)
        cy.get('div[class*="book__description"] p[class*="book__text"]').first().contains(book.description)
    })
  })
  