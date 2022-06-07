import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";
import { mockHttpRequest } from "tests/data/mocks";
import { mockAxios, mockHttpResponse } from "../mocks/mock.axios";

import axios, { AxiosResponse } from "axios";

jest.mock('axios')

class AxiosHttpClient implements HttpClient {
    async request (data: HttpRequest): Promise<HttpResponse> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers,
            })
        } catch (error) {
            axiosResponse = error.response
        }
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        }
    }
}

describe('AxiosHttpClient', () => {
    test('should call axios with correct values', async () => {
        const fakeRequest = mockHttpRequest()
        const mockedAxios = mockAxios()
        const sut = new AxiosHttpClient()

        await sut.request(fakeRequest)

        expect(mockedAxios.request).toHaveBeenCalledWith({
            url: fakeRequest.url,
            method: fakeRequest.method,
            headers: fakeRequest.headers,
            data: fakeRequest.body,
        })
    })

    test('should return correct response', async () => {
        const fakeRequest = mockHttpRequest()
        const mockedAxios = mockAxios()
        const sut = new AxiosHttpClient()

        const httpResponse = await sut.request(fakeRequest)
        const axiosResponse = await mockedAxios.request.mock.results[0].value

        expect(httpResponse).toEqual({
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        })
    })

    test('should return correct error', async () => {
        const fakeRequest = mockHttpRequest()
        const mockedAxios = mockAxios()
        const sut = new AxiosHttpClient()
        mockedAxios.request.mockRejectedValueOnce({
            response: mockHttpResponse()
        })

        const promise = sut.request(fakeRequest)

        await expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
})