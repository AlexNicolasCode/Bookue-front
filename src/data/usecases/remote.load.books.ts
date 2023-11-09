import { InvalidUserError, UnexpectedError } from '@/domain/errors'
import { LoadBooks } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../protocols/http'

export class RemoteLoadBooks implements LoadBooks {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<HttpResponseLoadBooks>
  ) {}

  async loadBooks(params: LoadBooks.Params): Promise<LoadBooks.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.accessToken}`,
      },
      body: JSON.stringify({
        query: `
            query LoadAllBooks {
                loadAllBooks {
                  id
                  title
                  author
                  description
                  currentPage
                  pages
                  createdAt
                }
              }
          `,
      }),
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data.loadAllBooks
      case HttpStatusCode.forbidden:
        throw new InvalidUserError()
      default:
        throw new UnexpectedError()
    }
  }
}

export type HttpResponseLoadBooks = {
  data: {
    loadAllBooks: LoadBooks.Result
  }
}
