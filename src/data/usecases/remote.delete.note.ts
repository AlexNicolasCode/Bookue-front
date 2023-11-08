import { DeleteNote } from "@/domain/usecases";
import { LoadCookie } from "../protocols/cookie";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteDeleteNote implements DeleteNote {
    constructor(
          private readonly loadCookie: LoadCookie,
          private readonly url: string,
          private readonly httpClient: HttpClient,
    ) {}
  
    async delete(params: DeleteNote.Params): Promise<void> {
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
              mutation DeleteNote($bookId: String!, $noteId: String!) {
                deleteNote(bookId: $bookId, noteId: $noteId)
              }
            `,
  
          variables: { 
            bookId: params.bookId,
            noteId: params.noteId,
          },
        })
      })
      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok: return httpResponse.body.data.deleteNote;
        default: throw new UnexpectedError();
      }
    }
  }
  