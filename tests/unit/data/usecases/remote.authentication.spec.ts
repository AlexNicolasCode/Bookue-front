import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from 'tests/unit/data/mocks';
import { mockAuthenticationParams } from 'tests/unit/domain/mocks';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { RemoteAuthentication } from '@/data/usecases';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: RemoteAuthentication
    httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<boolean>();
  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const fakeRequest = mockAuthenticationParams();
    const spacesRegex = /^\s+|\s+$/gm;

    await sut.auth(fakeRequest);

    expect(httpClientSpy.body.replace(spacesRegex, '')).toBe(`
        query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
              name
            }
          }
          
          {
            "email": ${fakeRequest.email},
            "password": ${fakeRequest.password},
          }
        `.replace(spacesRegex, ''));
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  test('should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const httpResponse = sut.auth(mockAuthenticationParams());

    await expect(httpResponse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const httpResponse = sut.auth(mockAuthenticationParams());

    await expect(httpResponse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw EmailInUseError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const httpResponse = sut.auth(mockAuthenticationParams());

    await expect(httpResponse).rejects.toThrow(new EmailInUseError());
  });

  test('should return correct body on success', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        accessToken: faker.datatype.uuid(),
        name: faker.random.word(),
      },
    };

    const httpResponse = await sut.auth(mockAuthenticationParams());

    expect(httpResponse).toEqual(httpClientSpy.response.body);
  });
});
