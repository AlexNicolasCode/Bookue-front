import { EmailInUseError, UnexpectedError } from "@/domain/errors"
import { AddAccount } from "@/domain/usecases"
import { HttpClient, HttpStatusCode } from "../protocols/http"

export class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpClient<boolean>,
    ) {}

    async add (params: AddAccount.Params): Promise<AddAccount.Result> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: `
            mutation SignUp($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
                signUp(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
                  accessToken
                  name
                }
              }

            {  
              "name": ${params.name},
              "email": ${params.email},  
              "password": ${params.password},
              "passwordConfirmation": ${params.passwordConfirmation}
            }
            `
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }
    }
}