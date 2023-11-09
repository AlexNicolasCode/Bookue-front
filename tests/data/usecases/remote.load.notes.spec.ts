import { faker } from '@faker-js/faker'

import { RemoteLoadNotes } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { NoteModel } from '@/domain/models'

import { throwError } from '@/tests/main/domain/mocks/test.helpers'
import { HttpClientSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: RemoteLoadNotes
  url: string
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const url = faker.datatype.uuid()
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadNotes(url, httpClientSpy)
  return {
    sut,
    url,
    httpClientSpy,
  }
}

describe('RemoteLoadNotes', () => {
  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeParams = {
      accessToken: faker.datatype.uuid(),
      bookId: faker.datatype.uuid(),
    }
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

    const promise = sut.loadNotes(fakeParams)

    await expect(promise).rejects.toThrow()
  })

  test('Should throw UnexpectedError when HttpRequest return an unexpected status code', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeParams = {
      accessToken: faker.datatype.uuid(),
      bookId: faker.datatype.uuid(),
    }
    httpClientSpy.response = {
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError'],
      }),
    }

    const promise = sut.loadNotes(fakeParams)

    await expect(promise).rejects.toEqual(new UnexpectedError())
  })

  test('Should clean array when HttpRequest return 204 No Content status code', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeParams = {
      accessToken: faker.datatype.uuid(),
      bookId: faker.datatype.uuid(),
    }
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const result = await sut.loadNotes(fakeParams)

    expect(result).toEqual([])
  })

  test('Should return notes on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const fakeParams = {
      accessToken: faker.datatype.uuid(),
      bookId: faker.datatype.uuid(),
    }
    const fakeNote: NoteModel = {
      id: faker.datatype.uuid(),
      text: faker.random.words(),
    }
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: {
          loadNotes: [fakeNote],
        },
      },
    }

    const result = await sut.loadNotes(fakeParams)

    expect(result).toEqual([fakeNote])
  })
})
