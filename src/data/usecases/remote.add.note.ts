import { UnexpectedError } from "@/domain/errors"
import { AddNote } from "@/domain/usecases"
import { LoadCookie } from "../protocols/cookie"
import { HttpClient, HttpStatusCode } from "../protocols/http"

export class RemoteAddNote implements AddNote {
    constructor(
        private readonly loadCookie: LoadCookie,
        private readonly url: string,
        private readonly httpClient: HttpClient,
    ) {}
  
    async add(params: AddNote.Params): Promise<void> {
      const accessToken = await this.loadCookie.load('bookue-user')
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
              mutation AddNote($bookId: String!, $text: String!) {
                  addNote(bookId: $bookId, text: $text!) {}
              }
            `,
  
          variables: { 
            bookId: params.bookId,
            text: params.text,
          },
        })
      })
      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok: return
        default: throw new UnexpectedError()
      }
    }
}