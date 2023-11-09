import { faker } from '@faker-js/faker'

import { RemoteAddNote } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'

import { LoadCookieSpy } from '@/tests/infra/mocks'
import { mockAddNoteParams } from '@/tests/main/domain/mocks'
import { HttpClientSpy } from '../mocks'
import { throwError } from '@/tests/main/domain/mocks/test.helpers'

type SutTypes = {
  sut: RemoteAddNote
  url: string
  loadCookieSpy: LoadCookieSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const loadCookieSpy = new LoadCookieSpy()
  const url = faker.internet.url()
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddNote(loadCookieSpy, url, httpClientSpy)
  return {
    sut,
    url,
    loadCookieSpy,
    httpClientSpy,
  }
}

describe('RemoteAddNote', () => {
  test('should call LoadCookieSpy with correct key', async () => {
    const { sut, loadCookieSpy, httpClientSpy } = makeSut()
    const fakeRequest = mockAddNoteParams()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          addNote: {
            id: faker.datatype.uuid(),
          },
        },
      },
    }

    await sut.add(fakeRequest)

    expect(loadCookieSpy.key).toBe('bookue-user')
  })

  test('should throw if LoadCookieSpy throws', async () => {
    const { sut, loadCookieSpy } = makeSut()
    const fakeRequest = mockAddNoteParams()
    jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

    const promise = sut.add(fakeRequest)

    await expect(promise).rejects.toThrow()
  })

  test('should call HttpClient with correct params', async () => {
    const { sut, loadCookieSpy, httpClientSpy, url } = makeSut()
    const fakeRequest = mockAddNoteParams()
    const accessToken = loadCookieSpy.result
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          addNote: {
            id: faker.datatype.uuid(),
          },
        },
      },
    }

    await sut.add(fakeRequest)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toStrictEqual({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    })
  })

  test('should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeRequest = mockAddNoteParams()
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

    const promise = sut.add(fakeRequest)

    await expect(promise).rejects.toThrow()
  })

  test('should throw if HttpClient return status code that not 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeRequest = mockAddNoteParams()
    httpClientSpy.response.statusCode = 500

    const promise = sut.add(fakeRequest)

    await expect(promise).rejects.toThrow()
  })

  test('should return correct note id on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeRequest = mockAddNoteParams()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          addNote: {
            id: faker.datatype.uuid(),
          },
        },
      },
    }

    const response = await sut.add(fakeRequest)

    expect(response.id).toBe(httpClientSpy.response.body.data.addNote.id)
  })
})
