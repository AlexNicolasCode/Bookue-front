import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

type HttpResponseAddAccount = {
  data: {
    signUp: {
      accessToken: string
    }
  }
}

export class RemoteAddAccount implements AddAccount {
  constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<HttpResponseAddAccount>,
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result | undefined> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation SignUp($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
              signUp(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
                accessToken
              }
            }`,

        variables: {  
          name: params.name,
          email: params.email,  
          password: params.password,
          passwordConfirmation: params.passwordConfirmation
        },
      })
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body.data.signUp;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}
