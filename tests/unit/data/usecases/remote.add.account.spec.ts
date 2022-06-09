import { HttpStatusCode } from "@/data/protocols/http";
import { HttpClientSpy } from "../mocks";
import { mockAddAccountParams } from "tests/unit/domain/mocks";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { RemoteAddAccount } from "@/data/usecases";

import { faker } from "@faker-js/faker";

type SutTypes = {
    sut: RemoteAddAccount
    httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<boolean>()
    const sut = new RemoteAddAccount(url, httpClientSpy)
    return {
        sut,
        httpClientSpy
    }
}

describe('RemoteAddAccount', () => {
    test('should call HttpClient with correct params', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        const fakeRequest = mockAddAccountParams()
        const spacesRegex = /^\s+|\s+$/gm

        await sut.add(fakeRequest)
        
        expect(httpClientSpy.body.replace(spacesRegex,'')).toBe(`
        mutation SignUp($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
            signUp(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
              accessToken
              name
            }
          }

        {  
          "name": ${fakeRequest.name},
          "email": ${fakeRequest.email},  
          "password": ${fakeRequest.password},
          "passwordConfirmation": ${fakeRequest.passwordConfirmation}
        }
        `.replace(spacesRegex,''))
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
    })

    test('should throw UnexpectedError if HttpClient return 500', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpClient return 400', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpClient return 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new UnexpectedError())
    })

    test('should throw EmailInUseError if HttpClient return 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }

        const httpResponse = sut.add(fakeRequest)
        
        await expect(httpResponse).rejects.toThrow(new EmailInUseError())
    })

    test('should return true if HttpClient returns 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        const fakeRequest = mockAddAccountParams()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: true,
        }

        const httpResponse = await sut.add(fakeRequest)
        
        expect(httpResponse).toBe(true)
    })
})