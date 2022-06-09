import { HttpClient, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => {
  const methods: HttpMethod[] = ['get', 'post', 'put', 'delete']
  const randomMethod = methods[faker.datatype.number({ min: 0, max: 3})]
  return {
    url: faker.internet.url(),
    method: randomMethod,
    body: { fake: faker.random.word() },
    headers: { fake: faker.random.word() }
  }
}

export class HttpClientSpy<R = any> implements HttpClient<R> {
    url?: string
    method?: string
    body?: any
    headers?: any
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.ok
    }
  
    async request (data: HttpRequest): Promise<HttpResponse<R>> {
      this.url = data.url
      this.method = data.method
      this.body = data.body
      this.headers = data.headers
      return this.response
    }
}