import { faker } from '@faker-js/faker';

import { LoadBooks } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy, mockBookList } from '../mocks';

import { throwError } from 'tests/main/domain/mocks/test.helpers';
import { UnexpectedError } from '@/domain/errors';

type HttpResponseLoadBooks = {
  data: {
    loadAllBooks: LoadBooks.Result
  }
}

class RemoteLoadBooks implements LoadBooks {
  constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseLoadBooks>,
  ) {}

  async loadBooks (params: LoadBooks.Params): Promise<LoadBooks.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${params.accessToken}`,
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
        `
      }),
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body.data.loadAllBooks;
      default: throw new UnexpectedError();
    }
  }
}

type SutTypes = {
    sut: RemoteLoadBooks
    httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<HttpResponseLoadBooks>();
  const sut = new RemoteLoadBooks(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};


describe('RemoteLoadBooks', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          loadAllBooks: mockBookList()
        }
      },
    };

    await sut.loadBooks(fakeRequest);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.headers).toStrictEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fakeRequest.accessToken}`,
    });
  });

  test('should throw if httpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

    const promise = sut.loadBooks(fakeRequest);

    await expect(promise).rejects.toThrow()
  });

  test('should return correct books on success', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          loadAllBooks: mockBookList()
        }
      },
    };

    const response = await sut.loadBooks(fakeRequest);

    expect(response).toEqual(httpClientSpy.response.body.data.loadAllBooks)
  });

  test('should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const response = sut.loadBooks(fakeRequest);

    await expect(response).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const response = sut.loadBooks(fakeRequest);

    await expect(response).rejects.toThrow(new UnexpectedError());
  });
});
