import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAddBook } from "@/data/usecases";
import { UnexpectedError } from "@/domain/errors";

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

