import { faker } from '@faker-js/faker'

import { RemoteAddBook } from '@/data/usecases'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

import { HttpClientSpy } from '../mocks'
import { CookieManagerAdapterSpy } from '@/tests/infra/mocks'
import { throwError } from '@/tests/main/domain/mocks/test.helpers'

type SutTypes = {
    sut: RemoteAddBook
    url: string
    cookieManagerAdapterSpy: CookieManagerAdapterSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const url = faker.internet.url()
    const cookieManagerAdapterSpy = new CookieManagerAdapterSpy()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteAddBook(url, cookieManagerAdapterSpy, httpClientSpy)
    return {
        sut,
        url,
        cookieManagerAdapterSpy,
        httpClientSpy
    }
}

describe('RemoteAddBook', () => {
    let fakeRequest

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid()
        }
    })

    test('should call HttpClient with correct values', async () => {
        const { sut, url, cookieManagerAdapterSpy, httpClientSpy } = makeSut()
        const accessToken = cookieManagerAdapterSpy.result
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
        }

        await sut.add(fakeRequest)

        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
        expect(httpClientSpy.headers).toStrictEqual({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        })
    })

    test('should throw if HttpClient throws', async () => {
        const { sut, httpClientSpy } = makeSut()
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrow()
    })

    test('should throw if CookieManagerAdapter throws', async () => {
        const { sut, cookieManagerAdapterSpy } = makeSut()
        jest.spyOn(cookieManagerAdapterSpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrow()
    })

    test('should throw UnexpectedError if HttpClient return status code different 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: faker.internet.httpStatusCode({ types: ['clientError', 'serverError', 'informational'] }),
        }
    
        const response = sut.add(fakeRequest)
    
        await expect(response).rejects.toThrow(new UnexpectedError())
    })

    test('should return undefined on success', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
          statusCode: HttpStatusCode.ok,
        }
    
        const response = await sut.add(fakeRequest)
    
        expect(response).toBeUndefined()
    })
})