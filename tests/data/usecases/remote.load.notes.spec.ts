import { faker } from "@faker-js/faker";

import { LoadNotes } from "@/domain/usecases";
import { LoadCookie } from "@/data/protocols/cookie";

import { CookieManagerAdapterSpy } from "@/tests/infra/mocks";
import { throwError } from "@/tests/main/domain/mocks/test.helpers";

export class RemoteLoadNotes implements LoadNotes {
    constructor(
          private readonly loadCookie: LoadCookie,
    ) {}
  
    async loadNotes (bookId: string): Promise<LoadNotes.Result> {
        const accessToken = await this.loadCookie.load('bookue-user')
        return []
    }
}

export type HttpResponseLoadNotes = {
    data: {
        loadAllBooks: LoadNotes.Result
    }
}

describe('RemoteLoadNotes', () => {
    test('Should throw if LoadCookie throws', async () => {
        const loadCookieSpy = new CookieManagerAdapterSpy()
        const sut = new RemoteLoadNotes(loadCookieSpy)
        const fakeBookId = faker.datatype.uuid()
        jest.spyOn(loadCookieSpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.loadNotes(fakeBookId)
        
        await expect(promise).rejects.toThrow()
    });
});
