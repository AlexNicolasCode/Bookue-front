import { faker } from "@faker-js/faker";

import { HttpStatusCode } from "@/data/protocols/http";
import { InvalidUserError, UnexpectedError } from "@/domain/errors";
import { HttpResponseLoadBook, RemoteLoadBook } from "@/data/usecases";

import { HttpClientSpy, mockBook } from "@/tests/data/mocks";
import { throwError } from "@/tests/main/domain/mocks/test.helpers";

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

    test('should throw UnexpectedError if HttpClient return 400', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
          statusCode: HttpStatusCode.badRequest,
        };
    
        const response = sut.loadBook(fakeRequest);
    
        await expect(response).rejects.toThrow(new UnexpectedError());
    });

    test('should throw UnexpectedError if HttpClient return 500', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
          statusCode: HttpStatusCode.serverError,
        };
    
        const response = sut.loadBook(fakeRequest);
    
        await expect(response).rejects.toThrow(new UnexpectedError());
    });

    test('should throw UnexpectedError if HttpClient return 404', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
          statusCode: HttpStatusCode.notFound,
        };
    
        const response = sut.loadBook(fakeRequest);
    
        await expect(response).rejects.toThrow(new UnexpectedError());
    });

    test('should throw InvalidUserError if HttpClient return 403', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
          statusCode: HttpStatusCode.forbidden,
        };
    
        const response = sut.loadBook(fakeRequest);
    
        await expect(response).rejects.toThrow(new InvalidUserError());
    });    
})
