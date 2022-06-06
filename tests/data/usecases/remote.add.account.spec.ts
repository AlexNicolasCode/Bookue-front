import { HttpClient } from "@/data/protocols/http";
import { AddAccount } from "@/domain/usecases";
import { HttpClientSpy } from "../mocks";
import { mockAddAccountParams } from "tests/domain/mocks";

import { faker } from "@faker-js/faker";

class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient<boolean>,
    ) {}

    async add (params: AddAccount.Params): Promise<AddAccount.Result> {
        await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params
        })
        return
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
})