export interface AddNote {
  add: (params: AddNote.Params) => Promise<AddNote.Result>
}

export namespace AddNote {
  export type Params = {
    bookId: string
    text: string
  }
  export type Result = {
    id: string
  }
}
