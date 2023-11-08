import { faker } from '@faker-js/faker';

import { AddNote } from '@/domain/usecases';

export const mockAddNoteParams = (): AddNote.Params => ({
    bookId: faker.datatype.uuid(),
    text: faker.random.words(),
});
