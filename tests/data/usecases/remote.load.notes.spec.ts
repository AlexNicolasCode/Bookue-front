import { faker } from "@faker-js/faker";

import { LoadNotes } from "@/domain/usecases";
import { LoadCookie } from "@/data/protocols/cookie";
import { HttpClient } from "@/data/protocols/http";

import { CookieManagerAdapterSpy } from "@/tests/infra/mocks";
import { throwError } from "@/tests/main/domain/mocks/test.helpers";
import { HttpClientSpy } from "@/tests/data/mocks";

export class RemoteLoadNotes implements LoadNotes {
    constructor(
          private readonly url: string,
          private readonly loadCookie: LoadCookie,
          private readonly httpClient: HttpClient<HttpResponseLoadNotes>,
    ) {}
  
    async loadNotes (bookId: string): Promise<LoadNotes.Result> {
        const accessToken = await this.loadCookie.load('bookue-user')
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                query: `
                    query LoadNotes($bookId: String!) {
                        addBook(bookId: $bookId) {
                            id
                            text
                        }
                    }
                    `,
        
                variables: { 
                    bookId,
                },
            })
        })
        return []
    }
}

export type HttpResponseLoadNotes = {
    data: {
        loadAllBooks: LoadNotes.Result
    }
}

describe('RemoteLoadNotes', () => {
    test('Should throw if LoadCookie throws', async () => {
        const fakeUrl = faker.datatype.uuid()
        const httpClientSpy = new HttpClientSpy()
        const loadCookieSpy = new CookieManagerAdapterSpy()
        const sut = new RemoteLoadNotes(fakeUrl, loadCookieSpy, httpClientSpy)
        const fakeBookId = faker.datatype.uuid()
        jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toThrow()
    });

    test('Should throw if HttpClient throws', async () => {
        const fakeUrl = faker.datatype.uuid()
        const httpClientSpy = new HttpClientSpy()
        const loadCookieSpy = new CookieManagerAdapterSpy()
        const sut = new RemoteLoadNotes(fakeUrl, loadCookieSpy, httpClientSpy)
        const fakeBookId = faker.datatype.uuid()
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toThrow()
    });
});
