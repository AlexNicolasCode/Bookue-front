export interface AddBook {
    add: (params: AddBook.Params) => Promise<void>
}

export namespace AddBook {
    export type Params = {
        title: string
        author: string
        description: string
        currentPage: number
        pages: number
    }
}
