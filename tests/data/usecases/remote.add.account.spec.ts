import { faker } from "@faker-js/faker"

import { RemoteAddAccount } from "@/data/usecases"
import { AddAccount } from "@/domain/usecases"
import { EmailInUseError, UnexpectedError } from "@/domain/errors"

import { HttpClientSpy } from "@/tests/data/mocks"
import { mockAddAccountParams } from "@/tests/main/domain/mocks"
import { HttpStatusCode } from "@/data/protocols/http"

type SutTypes = {
    sut: RemoteAddAccount
    httpClientSpy: HttpClientSpy
}

type HttpResponseAddAccount = {
  data: {
    signUp: AddAccount.Result
  }
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<HttpResponseAddAccount>();
  const sut = new RemoteAddAccount(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAddAccount', () => {
  test('should call HttpClient with correct params', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          signUp: {
            accessToken: faker.datatype.uuid()
          }
        }
      },
    };

    await sut.add(fakeRequest);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.headers).toStrictEqual({ 'Content-Type': 'application/json' });
  });

  test('should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const httpResponse = sut.add(fakeRequest);

    await expect(httpResponse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const httpResponse = sut.add(fakeRequest);

    await expect(httpResponse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const httpResponse = sut.add(fakeRequest);

    await expect(httpResponse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw EmailInUseError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const httpResponse = sut.add(fakeRequest);

    await expect(httpResponse).rejects.toThrow(new EmailInUseError());
  });

  test('should return true if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddAccountParams();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          signUp: {
            accessToken: faker.datatype.uuid()
          }
        }
      },
    };

    const httpResponse = await sut.add(fakeRequest);

    expect(httpResponse).toBe(httpClientSpy.response.body.data.signUp);
  });
});
