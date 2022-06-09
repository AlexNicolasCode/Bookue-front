import { mockHttpRequest } from "tests/unit/data/mocks";
import { mockAxios, mockHttpResponse } from "../mocks/mock.axios";
import { AxiosHttpClient } from "@/infra/http";

import axios from "axios";

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
    const mockedAxios = mockAxios()
    const sut = new AxiosHttpClient()
    return {
        sut,
        mockedAxios,
    }
}

describe('AxiosHttpClient', () => {
    test('should call axios with correct values', async () => {
        const { sut, mockedAxios } = makeSut()
        const fakeRequest = mockHttpRequest()

        await sut.request(fakeRequest)

        expect(mockedAxios.request).toHaveBeenCalledWith({
            url: fakeRequest.url,
            method: fakeRequest.method,
            headers: fakeRequest.headers,
            data: fakeRequest.body,
        })
    })

    test('should return correct response', async () => {
        const { sut, mockedAxios } = makeSut()
        const fakeRequest = mockHttpRequest()

        const httpResponse = await sut.request(fakeRequest)
        const axiosResponse = await mockedAxios.request.mock.results[0].value

        expect(httpResponse).toEqual({
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        })
    })

    test('should return correct error', async () => {
        const { sut, mockedAxios } = makeSut()
        const fakeRequest = mockHttpRequest()
        mockedAxios.request.mockRejectedValueOnce({
            response: mockHttpResponse()
        })

        const promise = sut.request(fakeRequest)

        await expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
})