import { faker } from '@faker-js/faker';

import { DeleteNote } from '@/domain/usecases';
import { HttpClient } from '@/data/protocols/http';
import { LoadCookie } from '@/data/protocols/cookie';

import { LoadCookieSpy } from '@/tests/infra/mocks';
import { mockDeleteNoteParams } from '@/tests/main/domain/mocks';
import { HttpClientSpy } from '../mocks';
import { throwError } from '@/tests/main/domain/mocks/test.helpers';

class RemoteDeleteNote implements DeleteNote {
  constructor(
        private readonly loadCookie: LoadCookie,
        private readonly url: string,
        private readonly httpClient: HttpClient,
  ) {}

  async delete(params: DeleteNote.Params): Promise<void> {
    const accessToken = await this.loadCookie.load('bookue-user')
    await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `
            mutation DeleteNote($bookId: String!, $noteId: String!) {
              deleteNote(bookId: $bookId, noteId: $noteId)
            }
          `,

        variables: { 
          bookId: params.bookId,
          noteId: params.noteId,
        },
      })
    })
  }
}

type SutTypes = {
  sut: RemoteDeleteNote
  url: string
  httpClientSpy: HttpClientSpy
  loadCookieSpy: LoadCookieSpy
}

const makeSut = (): SutTypes => {
  const loadCookieSpy = new LoadCookieSpy();
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteDeleteNote(loadCookieSpy, url, httpClientSpy);
  return {
    sut,
    url,
    httpClientSpy,
    loadCookieSpy,
  }
}


describe('RemoteDeleteNote', () => {
  test('should call LoadCookie with correct key', async () => {
    const { sut, loadCookieSpy } = makeSut();
    const fakeRequest = mockDeleteNoteParams();

    await sut.delete(fakeRequest);

    expect(loadCookieSpy.key).toBe('bookue-user');
  });

  test('should throw if LoadCookie throws', async () => {
    const { sut, loadCookieSpy } = makeSut();
    const fakeRequest = mockDeleteNoteParams();
    jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

    const promise = sut.delete(fakeRequest);

    await expect(promise).rejects.toThrow();
  });

  test('should call HttpClient with correct params', async () => {
    const { sut, url, loadCookieSpy, httpClientSpy } = makeSut();
    const fakeRequest = mockDeleteNoteParams();
    const accessToken = loadCookieSpy.result;

    await sut.delete(fakeRequest);

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toStrictEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    })
  });
});
