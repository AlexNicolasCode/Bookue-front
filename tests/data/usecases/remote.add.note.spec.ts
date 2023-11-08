import { faker } from '@faker-js/faker';

import { RemoteAddNote } from '@/data/usecases';

import { CookieManagerAdapterSpy } from '@/tests/infra/mocks';
import { mockAddNoteParams } from '@/tests/main/domain/mocks';
import { HttpClientSpy } from '../mocks';
import { throwError } from '@/tests/main/domain/mocks/test.helpers';

type SutTypes = {
    sut: RemoteAddNote
    url: string
    loadCookieSpy: CookieManagerAdapterSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const loadCookieSpy = new CookieManagerAdapterSpy();
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAddNote(loadCookieSpy, url, httpClientSpy);
    return {
        sut,
        url,
        loadCookieSpy,
        httpClientSpy,
    }
}

describe('RemoteAddNote', () => {
  test('should call CookieManagerAdapterSpy with correct key', async () => {
    const { sut, loadCookieSpy } = makeSut();
    const fakeRequest = mockAddNoteParams();

    await sut.add(fakeRequest);

    expect(loadCookieSpy.key).toBe('bookue-user');
  });

  test('should throw if CookieManagerAdapterSpy throws', async () => {
    const { sut, loadCookieSpy } = makeSut();
    const fakeRequest = mockAddNoteParams();
    jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

    const promise = sut.add(fakeRequest);

    await expect(promise).rejects.toThrow();
  });

  test('should call HttpClient with correct params', async () => {
    const { sut, loadCookieSpy, httpClientSpy, url } = makeSut();
    const fakeRequest = mockAddNoteParams();
    const accessToken = loadCookieSpy.result;

    await sut.add(fakeRequest);

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toStrictEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    })
  });

  test('should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddNoteParams();
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

    const promise = sut.add(fakeRequest);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if HttpClient return status code that not 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const fakeRequest = mockAddNoteParams();
    httpClientSpy.response.statusCode = 500

    const promise = sut.add(fakeRequest);

    await expect(promise).rejects.toThrow();
  });

  test('should return none on success', async () => {
    const { sut } = makeSut();
    const fakeRequest = mockAddNoteParams();

    const response = await sut.add(fakeRequest);

    expect(response).toBeUndefined();
  });
});