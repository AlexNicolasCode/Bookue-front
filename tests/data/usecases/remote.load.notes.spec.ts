import { faker } from "@faker-js/faker";

import { LoadNotes } from "@/domain/usecases";
import { LoadCookie } from "@/data/protocols/cookie";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";

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
                        loadNotes(bookId: $bookId) {
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
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body.data.loadNotes;
            default: throw new UnexpectedError();
        }
    }
}

export type HttpResponseLoadNotes = {
    data: {
        loadNotes: LoadNotes.Result
    }
}

type SutTypes = {
    sut: RemoteLoadNotes
    url: string
    loadCookieSpy: CookieManagerAdapterSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const url = faker.datatype.uuid()
    const httpClientSpy = new HttpClientSpy()
    const loadCookieSpy = new CookieManagerAdapterSpy()
    const sut = new RemoteLoadNotes(url, loadCookieSpy, httpClientSpy)
    return {
        sut,
        url,
        httpClientSpy,
        loadCookieSpy,
    }
}

describe('RemoteLoadNotes', () => {
    test('Should throw if LoadCookie throws', async () => {
        const { sut, loadCookieSpy } = makeSut()
        const fakeBookId = faker.datatype.uuid()
        jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toThrow()
    });

    test('Should throw if HttpClient throws', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeBookId = faker.datatype.uuid()
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toThrow()
    });

    test('Should throw UnexpectedError when HttpRequest return an unexpected status code', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeBookId = faker.datatype.uuid()
        httpClientSpy.response = {
            statusCode: faker.internet.httpStatusCode({
                types: [
                    'clientError',
                    'serverError',
                ]
            })
        }

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toEqual(new UnexpectedError())
    });
});
