import { NoteModel } from '../models'

export interface LoadNotes {
  loadNotes: (params: LoadNotes.Params) => Promise<LoadNotes.Result>
}

export namespace LoadNotes {
  export type Params = {
    accessToken: string
    bookId: string
  }
  export type Result = NoteModel[] | []
}
