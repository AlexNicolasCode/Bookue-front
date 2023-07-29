describe('Home screen', () => {
  beforeEach(() => {
    cy.setCookie('bookue-user', 'any_token')
    cy.task('startServer', {
      baseUrl: '/graphql',
      statusCode: 200,
      body: {
        data: {
          loadAllBooks: [{}, {}]
        }
      }
    })
  })

  afterEach(() => {
    cy.task('closeServer')
  })

  it('Should change to sign up page when click in sign up button', () => {
    cy.visit('/')
    
    cy.getByTestId('sign-up-button').click()

    cy.url().should('include', '/login')
  })
})
