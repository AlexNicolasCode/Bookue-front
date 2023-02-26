import { UnexpectedError } from "@/domain/errors";
import { AddBook } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http";

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
    ) {}
  
    async add(params: AddBook.Params): Promise<undefined> {
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
              mutation Mutation(
                  $title: String!,
                  $author: String!,
                  $pages: String!,
                  $accessToken: String!,
                  $description: String,
                  $currentPage: String
              ) {
                  addBook(
                      title: $title, 
                      author: $author, 
                      pages: $pages, 
                      accessToken: $accessToken, 
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
  