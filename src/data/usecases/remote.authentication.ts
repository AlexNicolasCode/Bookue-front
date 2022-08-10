import { EmailInUseError, InvalidEmailError, UnexpectedError } from '@/domain/errors';
import { Authentication } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result | undefined> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                accessToken
                name
              }
            }
        `,
        variables: {
            email: params.email,
            password: params.password,
        }
      }),
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body;
      case HttpStatusCode.unauthorized: throw new InvalidEmailError();
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}
