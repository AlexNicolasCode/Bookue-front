import { UnexpectedError } from "@/domain/errors";
import { AddBook } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { LoadCookie } from "../protocols/cookie";

type HttpResponseAddBook = {
    data: {
      addBook: {
          id: string
      }
    }
  }

export class RemoteAddBook implements AddBook {
    constructor(
          private readonly url: string,
          private readonly httpClient: HttpClient<HttpResponseAddBook>,
          private readonly loadCookie: LoadCookie,
    ) {}
  
    async add(params: AddBook.Params): Promise<undefined> {
      const bookueCookie = await this.loadCookie.load('bookue-user')
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bookueCookie}` 
        },
        body: JSON.stringify({
          query: `
              mutation Mutation(
                  $title: String!,
                  $author: String,
                  $description: String,
                  $currentPage: Int,
                  $pages: Int!
              ) {
                  addBook(
                      title: $title, 
                      author: $author, 
                      pages: $pages, 
                      description: $description, 
                      currentPage: $currentPage
                  ) {
                      id
                  }
              }
            `,
  
          variables: {  
              title: params.title,
              author: params.author,
              pages: params.pages,
              description: params.description,
              currentPage: params.currentPage ?? 0,
          },
        })
      });
      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok: return;
        default: throw new UnexpectedError();
      }
    }
  }
  