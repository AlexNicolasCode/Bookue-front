import { faker } from "@faker-js/faker";

import { NoteModel } from "@/domain/models";

export const mockNote = (): NoteModel => ({
    id: faker.datatype.uuid(),
    text: faker.random.words(),
})

export const mockNoteList = (): NoteModel[] => {
    return [
        mockNote(),
        mockNote(),
        mockNote(),
        mockNote(),
        mockNote(),
        mockNote(),
        mockNote(),
    ]
}