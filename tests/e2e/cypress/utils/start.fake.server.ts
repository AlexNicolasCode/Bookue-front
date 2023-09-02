import { BookModel } from "../../../../src/domain/models"
import { mockBook } from "../../../data/mocks/mock.book"

type EndpointReturn = {
    loadAllBooks?: [] | [Partial<BookModel>]
    loadBook?: Partial<BookModel>
}

export const mockCustomEndpoint = (endpointReturn: EndpointReturn): void => {
    cy.task('startServer', {
        baseUrl: '/graphql',
        statusCode: 200,
        body: {
          data: endpointReturn
        }
    })
}

export const mockLoadAllBooksEndpoint = (fakeBook?: Partial<BookModel>): void => {
    const fakeBookFallback = mockBook()
    mockCustomEndpoint({ loadAllBooks: fakeBook ? [fakeBook] : [fakeBookFallback] })
}
