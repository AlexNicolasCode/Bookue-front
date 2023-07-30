import { faker } from "@faker-js/faker";

import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { LoadBook } from "@/domain/usecases";

import { HttpClientSpy, mockBook } from "@/tests/data/mocks";
import { throwError } from "@/tests/main/domain/mocks/test.helpers";

class RemoteLoadBook implements LoadBook {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseLoadBook>,
    ) {}

    async loadBook (params: LoadBook.Params): Promise<LoadBook.Result> {
        const httpResponse = await this.httpClient.request({
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
        if (httpResponse.statusCode === 200) {
            return httpResponse.body.data.loadBook
        }
    }
}

export type HttpResponseLoadBook = {
    data: {
        loadBook: LoadBook.Result
    }
}

type SutTypes = {
    sut: RemoteLoadBook
    httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<HttpResponseLoadBook>();
    const sut = new RemoteLoadBook(url, httpClientSpy);
    return {
        sut,
        httpClientSpy,
    };
};

describe('RemoteLoadBook', () => {
    let fakeRequest

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        };
    })

    test('should call HttpClient with correct values', async () => {
        const url = faker.internet.url();
        const { sut, httpClientSpy } = makeSut(url);
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: {
              data: {
                loadBook: mockBook()
              }
            },
        };

        await sut.loadBook(fakeRequest);

        expect(httpClientSpy.url).toBe(url);
        expect(httpClientSpy.method).toBe('post');
        expect(httpClientSpy.headers).toStrictEqual({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fakeRequest.accessToken}`,
        });
    });

    test('should throw if HttpClient throws', async () => {
        const { sut, httpClientSpy } = makeSut();
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

        const promise = sut.loadBook(fakeRequest);

        await expect(promise).rejects.toThrow()
    });

    test('should return correct book on success', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
          statusCode: HttpStatusCode.ok,
          body: {
            data: {
                loadBook: mockBook()
            }
          },
        };
    
        const response = await sut.loadBook(fakeRequest);
    
        expect(response).toEqual(httpClientSpy.response.body.data.loadBook)
    });
})
