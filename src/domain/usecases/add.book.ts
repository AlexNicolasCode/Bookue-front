export interface AddBook {
    add: (params: AddBook.Params) => Promise<AddBook.Result | undefined>
}

export namespace AddBook {
    export type Params = {
        title: string
        author: string
        description: string
        currentPage: number
        pages: number
    }
    export type Result = {
        title: string
        author: string
        description: string
        currentPage: number
        pages: number
    }
}
