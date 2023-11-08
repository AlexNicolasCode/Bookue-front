import { EmailInUseError, InvalidUserError, UnexpectedError } from '@/domain/errors';
import { Authentication } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

type HttpResponseAuthentication = {
  data: {
    login: {
      accessToken: string
    }
  }
}

export class RemoteAuthentication implements Authentication {
  constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseAuthentication>,
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
      case HttpStatusCode.ok: return httpResponse.body.data.login;
      case HttpStatusCode.unauthorized: throw new InvalidUserError();
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}
