import { BookModel } from "../models"

export interface LoadBooks {
    loadBooks: (params: LoadBooks.Params) => Promise<LoadBooks.Result | []>
}

export namespace LoadBooks {
    export type Params = {
        accessToken
    }
    export type Result = BookModel[]
}
