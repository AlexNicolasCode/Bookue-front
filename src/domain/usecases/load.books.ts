import { BookModel } from "../models"

export interface LoadBooks {
    loadBooks: (params: LoadBooks.Params) => Promise<LoadBooks.Result | []>
}

export namespace LoadBooks {
    export type Params = {
        accessToken: string
    }
    export type Result = BookModel[]
}
