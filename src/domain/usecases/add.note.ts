export interface AddNote {
    add: (params: AddNote.Params) => Promise<void>
}

export namespace AddNote {
    export type Params = {
        bookId: string
        text: string
    }
}
