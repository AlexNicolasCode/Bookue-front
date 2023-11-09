export interface DeleteNote {
  delete: (params: DeleteNote.Params) => Promise<void>
}

export namespace DeleteNote {
  export type Params = {
    bookId: string
    noteId: string
  }
}
