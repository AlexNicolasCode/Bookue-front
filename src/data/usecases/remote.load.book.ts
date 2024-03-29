import { LoadBook } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { InvalidUserError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadBook implements LoadBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<HttpResponseLoadBook>
  ) {}

  async loadBook(params: LoadBook.Params): Promise<LoadBook.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.accessToken}`,
      },
      body: JSON.stringify({
        query: `
          query LoadOneBook($bookId: String!) {
            loadOneBook(bookId: $bookId) {
              title
              author
              description
              currentPage
              pages
            }
          }
        `,

        variables: {
          bookId: params.bookId,
        }
      }),
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data.loadOneBook
      case HttpStatusCode.forbidden:
        throw new InvalidUserError()
      default:
        throw new UnexpectedError()
    }
  }
}

export type HttpResponseLoadBook = {
  data: {
    loadOneBook: LoadBook.Result
  }
}
