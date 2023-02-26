import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { AddBook } from "@/domain/usecases";

import { faker } from "@faker-js/faker";

import { mockAddBookParams } from "tests/unit/domain/mocks";
import { HttpClientSpy } from "../mocks";

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

describe('RemoteAddBook', () => {
    test('should call HttpClient with correct values', async () => {
      const url = faker.internet.url();
      const httpClientSpy = new HttpClientSpy<HttpResponseAddBook>();
      const sut = new RemoteAddBook(url, httpClientSpy);
      const fakeRequest = mockAddBookParams();
  
      await sut.add(fakeRequest);
  
      expect(httpClientSpy.url).toBe(url);
      expect(httpClientSpy.method).toBe('post');
      expect(httpClientSpy.headers).toStrictEqual({ 'Content-Type': 'application/json' });
    });

    test('should return correct body on success', async () => {
        const url = faker.internet.url();
        const httpClientSpy = new HttpClientSpy<HttpResponseAddBook>();
        const sut = new RemoteAddBook(url, httpClientSpy);
    
        const httpResponse = await sut.add(mockAddBookParams());
    
        expect(httpResponse).toEqual(undefined);
      });

    test('should throw when httpClient return server error', async () => {
        const url = faker.internet.url();
        const httpClientSpy = new HttpClientSpy<HttpResponseAddBook>();
        const sut = new RemoteAddBook(url, httpClientSpy);
        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const promise = sut.add(mockAddBookParams());
    
        await expect(promise).rejects.toThrow(new UnexpectedError());
      });
})

