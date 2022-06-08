import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { Authentication } from "@/domain/usecases";
import { HttpClientSpy } from "tests/data/mocks";
import { mockAuthenticationParams } from "tests/domain/mocks";

import { faker } from "@faker-js/faker";
import { UnexpectedError } from "@/domain/errors";

export class RemoteAuthentication implements Authentication {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient,
    ) {}

    async auth (params: Authentication.Params): Promise<Authentication.Result> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params,
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            default: throw new UnexpectedError()
        }
    }
}

describe('RemoteAuthentication', () => {
    test('should call HttpClient with correct values', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy()
        const sut = new RemoteAuthentication(url, httpClientSpy)
        const fakeRequest = mockAuthenticationParams()
        
        await sut.auth(fakeRequest)

        expect(httpClientSpy.body).toBe(fakeRequest)
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
    })

    test('should throw UnexpectedError if HttpClient return 400', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy()
        const sut = new RemoteAuthentication(url, httpClientSpy)
        httpClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        
        const httpResponse = sut.auth(mockAuthenticationParams())

        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })
})