import { EmailInUseError, UnexpectedError } from "@/domain/errors"
import { Authentication } from "@/domain/usecases"
import { HttpClient, HttpStatusCode } from "../protocols/http"

export class RemoteAuthentication implements Authentication {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient,
    ) {}

    async auth (params: Authentication.Params): Promise<Authentication.Result> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: `
            query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  accessToken
                  name
                }
              }
              
              {
                "email": ${params.email},
                "password": ${params.password},
              }
            `,
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }
    }
}