import { faker } from '@faker-js/faker'

import { AddBook } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '../mocks'
import { throwError } from '@/tests/main/domain/mocks/test.helpers'

type HttpResponseAddBook = {
  data: {
    addBook: {
      title: string
    }
  }
}

export class RemoteAddBook implements AddBook {
  constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseAddBook>,
  ) {}

  async add(params: AddBook.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${params.accessToken}`,
      },
      body: JSON.stringify({
        query: `
            mutation AddBook($title: String!, $author: String!, $description: String!, $currentPage: String! $pages: String!) {
                addBook(title: $title, author: $author, description: $description, currentPage: $currentPage, pages: $pages) {
                    title
                }
            }
            `,

        variables: { 
            title: params.title,
            author: params.author,
            description: params.description,
            currentPage: params.currentPage,
            pages: params.pages,
        },
      })
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return
      default: throw new UnexpectedError()
    }
  }
}

type SutTypes = {
    sut: RemoteAddBook
    url: string
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteAddBook(url, httpClientSpy)
    return {
        sut,
        url,
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
        const { sut, url, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
        }

        await sut.add(fakeRequest)

        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
        expect(httpClientSpy.headers).toStrictEqual({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fakeRequest.accessToken}`,
        })
    })

    test('should throw if HttpClient throws', async () => {
        const { sut, httpClientSpy } = makeSut();
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError)

        const promise = sut.add(fakeRequest);

        await expect(promise).rejects.toThrow()
    });

})