import { UnexpectedError } from "@/domain/errors";
import { LoadNotes } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { LoadCookie } from "@/data/protocols/cookie";

export class RemoteLoadNotes implements LoadNotes {
    constructor(
          private readonly url: string,
          private readonly loadCookie: LoadCookie,
          private readonly httpClient: HttpClient<HttpResponseLoadNotes>,
    ) {}
  
    async loadNotes (bookId: string): Promise<LoadNotes.Result> {
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
                    query LoadNotes($bookId: String!) {
                        loadNotes(bookId: $bookId) {
                            id
                            text
                        }
                    }
                    `,
        
                variables: { 
                    bookId,
                },
            })
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body.data.loadNotes;
            case HttpStatusCode.noContent: return [];
            default: throw new UnexpectedError();
        }
    }
}

export type HttpResponseLoadNotes = {
    data: {
        loadNotes: LoadNotes.Result
    }
}