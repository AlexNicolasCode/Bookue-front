import { faker } from '@faker-js/faker'

import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteAuthentication } from '@/data/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

import { HttpClientSpy } from '../mocks'
import { mockAuthenticationParams } from '@/tests/main/domain/mocks'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy
}

type HttpResponseAddAccount = {
  data: {
    login: Authentication.Result
  }
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<HttpResponseAddAccount>()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const fakeRequest = mockAuthenticationParams()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          login: {
            accessToken: faker.datatype.uuid(),
          },
        },
      },
    }

    await sut.auth(fakeRequest)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toStrictEqual({ 'Content-Type': 'application/json' })
  })

  test('should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const httpResponse = sut.auth(mockAuthenticationParams())

    await expect(httpResponse).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }

    const httpResponse = sut.auth(mockAuthenticationParams())

    await expect(httpResponse).rejects.toThrow(new UnexpectedError())
  })

  test('should throw EmailInUseError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }

    const httpResponse = sut.auth(mockAuthenticationParams())

    await expect(httpResponse).rejects.toThrow(new EmailInUseError())
  })

  test('should return correct body on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          login: {
            accessToken: faker.datatype.uuid(),
          },
        },
      },
    }

    const httpResponse = await sut.auth(mockAuthenticationParams())

    expect(httpResponse).toEqual(httpClientSpy.response.body.data.login)
  })
})
