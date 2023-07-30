import { faker } from "@faker-js/faker";

import { HttpResponseLoadBooks, RemoteLoadBooks } from "@/data/usecases";
import { InvalidUserError, UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";

import { HttpClientSpy, mockBookList } from "@/tests/data/mocks";
import { throwError } from "@/tests/main/domain/mocks/test.helpers";

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

  test('should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
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

  test('should throw InvalidUserError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = { accessToken: faker.datatype.uuid() };
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const response = sut.loadBooks(fakeRequest);

    await expect(response).rejects.toThrow(new InvalidUserError());
  });
});
