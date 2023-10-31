import { AddNote } from '@/domain/usecases';
import { LoadCookie } from '../protocols/cookie';

import { CookieManagerAdapterSpy } from '@/tests/infra/mocks';
import { mockAddNoteParams } from '@/tests/main/domain/mocks';
  
export class RemoteAddNote implements AddNote {
    constructor(
        private readonly loadCookie: LoadCookie,
    ) {}
  
    async add(params: AddNote.Params): Promise<void> {
      await this.loadCookie.load('bookue-user')
    }
  }

describe('RemoteAddNote', () => {
  test('should call CookieManagerAdapterSpy with correct key', async () => {
    const cookieManagerAdapterSpy = new CookieManagerAdapterSpy()
    const sut = new RemoteAddNote(cookieManagerAdapterSpy);
    const fakeRequest = mockAddNoteParams();

    await sut.add(fakeRequest);

    expect(cookieManagerAdapterSpy.key).toBe('bookue-user');
  });
});
