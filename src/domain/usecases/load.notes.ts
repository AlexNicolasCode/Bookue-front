import { NoteModel } from "../models"

export interface LoadNotes {
    loadNotes: (bookId: string) => Promise<LoadNotes.Result>
}

export namespace LoadNotes {
    export type Result = NoteModel[] | []
}
