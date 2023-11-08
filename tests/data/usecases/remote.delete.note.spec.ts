import { DeleteNote } from '@/domain/usecases';
import { LoadCookie } from '@/data/protocols/cookie';

import { LoadCookieSpy } from '@/tests/infra/mocks';
import { mockDeleteNoteParams } from '@/tests/main/domain/mocks';

class RemoteDeleteNote implements DeleteNote {
  constructor(
        private readonly loadCookie: LoadCookie,
  ) {}

  async delete(params: DeleteNote.Params): Promise<void> {
    await this.loadCookie.load('bookue-user')
  }
}


describe('RemoteDeleteNote', () => {
  test('should call LoadCookie with correct key', async () => {
    const loadCookieSpy = new LoadCookieSpy();
    const sut = new RemoteDeleteNote(loadCookieSpy);
    const fakeRequest = mockDeleteNoteParams();

    await sut.delete(fakeRequest);

    expect(loadCookieSpy.key).toBe('bookue-user');
  });
});
