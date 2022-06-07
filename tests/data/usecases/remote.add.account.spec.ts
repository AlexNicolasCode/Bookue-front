import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AddAccount } from "@/domain/usecases";
import { HttpClientSpy } from "../mocks";
import { mockAddAccountParams } from "tests/domain/mocks";
import { UnexpectedError } from "@/domain/errors";

import { faker } from "@faker-js/faker";

class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient<boolean>,
    ) {}

    async add (params: AddAccount.Params): Promise<AddAccount.Result> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            default: throw new UnexpectedError()
        }
    }
}

describe('RemoteAddAccount', () => {
    test('should call HttpClient with correct params', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy<boolean>()
        const sut = new RemoteAddAccount(url, httpClientSpy)
        const fakeRequest = mockAddAccountParams()

        await sut.add(fakeRequest)
        
        expect(httpClientSpy.body).toBe(fakeRequest)
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
    })

    test('should throw UnexpectedError if HttpClient return 500', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy<boolean>()
        const sut = new RemoteAddAccount(url, httpClientSpy)
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpClient return 400', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy<boolean>()
        const sut = new RemoteAddAccount(url, httpClientSpy)
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpClient return 404', async () => {
        const url = faker.internet.url()
        const httpClientSpy = new HttpClientSpy<boolean>()
        const sut = new RemoteAddAccount(url, httpClientSpy)
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })
})