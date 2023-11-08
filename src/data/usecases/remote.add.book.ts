import { AddBook } from "@/domain/usecases"
import { HttpClient, HttpStatusCode } from "../protocols/http"
import { UnexpectedError } from "@/domain/errors"
import { LoadCookie } from "../protocols/cookie"

type HttpResponseAddBook = {
    data: {
      addBook: {
        title: string
      }
    }
  }
  
export class RemoteAddBook implements AddBook {
    constructor(
          private readonly url: string,
          private readonly loadCookie: LoadCookie,
          private readonly httpClient: HttpClient<HttpResponseAddBook>,
    ) {}
  
    async add(params: AddBook.Params): Promise<void> {
      const accessToken = await this.loadCookie.load('bookue-user')
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
              mutation AddBook($title: String!, $author: String!, $description: String!, $currentPage: String! $pages: String!) {
                  addBook(title: $title, author: $author, description: $description, currentPage: $currentPage, pages: $pages) {
                      title
                  }
              }
              `,
  
          variables: { 
              title: params.title,
              author: params.author,
              description: params.description,
              currentPage: params.currentPage,
              pages: params.pages,
          },
        })
      })
      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok: return
        default: throw new UnexpectedError()
      }
    }
  }
