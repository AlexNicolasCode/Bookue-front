import { faker } from '@faker-js/faker';

import { LoadBooks } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy, mockBookList } from '../mocks';

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
    return []
  }
}

describe('RemoteLoadBooks', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy<HttpResponseLoadBooks>();
    const sut = new RemoteLoadBooks(url, httpClientSpy);
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
});
