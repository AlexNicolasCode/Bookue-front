import { faker } from '@faker-js/faker';

import { AddNote, DeleteNote } from '@/domain/usecases';

export const mockAddNoteParams = (): AddNote.Params => ({
    bookId: faker.datatype.uuid(),
    text: faker.random.words(),
});

export const mockDeleteNoteParams = (): DeleteNote.Params => ({
    bookId: faker.datatype.uuid(),
    noteId: faker.datatype.uuid(),
});
