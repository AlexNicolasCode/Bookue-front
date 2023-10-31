import { faker } from '@faker-js/faker';

import { AddNote } from '@/domain/usecases';
import { LoadCookie } from '../protocols/cookie';
import { HttpClient } from '../protocols/http';

import { CookieManagerAdapterSpy } from '@/tests/infra/mocks';
import { mockAddNoteParams } from '@/tests/main/domain/mocks';
import { HttpClientSpy } from '../mocks';
  
export class RemoteAddNote implements AddNote {
    constructor(
        private readonly loadCookie: LoadCookie,
        private readonly url: string,
        private readonly httpClient: HttpClient,
    ) {}
  
    async add(params: AddNote.Params): Promise<void> {
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
              mutation AddNote($bookId: String!, $text: String!) {
                  addNote(bookId: $bookId, text: $text!) {}
              }
            `,
  
          variables: { 
            bookId: params.bookId,
            text: params.text,
          },
        })
      })
    }
  }

describe('RemoteAddNote', () => {
  test('should call CookieManagerAdapterSpy with correct key', async () => {
    const cookieManagerAdapterSpy = new CookieManagerAdapterSpy();
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAddNote(cookieManagerAdapterSpy, url, httpClientSpy);
    const fakeRequest = mockAddNoteParams();

    await sut.add(fakeRequest);

    expect(cookieManagerAdapterSpy.key).toBe('bookue-user');
  });

  test('should call HttpClient with correct params', async () => {
    const cookieManagerAdapterSpy = new CookieManagerAdapterSpy();
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAddNote(cookieManagerAdapterSpy, url, httpClientSpy);
    const fakeRequest = mockAddNoteParams();
    const accessToken = cookieManagerAdapterSpy.result;

    await sut.add(fakeRequest);

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toStrictEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    })
  });
});
