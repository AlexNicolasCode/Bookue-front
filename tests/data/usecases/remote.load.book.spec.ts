import { faker } from "@faker-js/faker";

import { HttpClient } from "@/data/protocols/http";
import { LoadBook } from "@/domain/usecases";

import { HttpClientSpy } from "@/tests/data/mocks";

class RemoteLoadBook implements LoadBook {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseLoadBook>,
    ) {}

    async loadBook (params: LoadBook.Params): Promise<LoadBook.Result> {
        await this.httpClient.request({
            url: this.url,
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.accessToken}`,
            },
            body: JSON.stringify({
            query: `
                query LoadBook {
                    loadBook {
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
        })
        return
    }
}

export type HttpResponseLoadBook = {
    data: {
        loadBook: LoadBook.Result
    }
}

describe('RemoteLoadBook', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteLoadBook(url, httpClientSpy);
    const fakeRequest = {
        accessToken: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    };

    await sut.loadBook(fakeRequest);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.headers).toStrictEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fakeRequest.accessToken}`,
    });
  });
})
