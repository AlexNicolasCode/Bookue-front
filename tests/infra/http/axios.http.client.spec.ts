import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";
import { mockHttpRequest } from "tests/data/mocks";
import { mockAxios } from "../mocks/mock.axios";

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
        return
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
})