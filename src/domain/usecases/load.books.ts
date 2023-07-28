import { BookModel } from "../models"

export interface LoadBooks {
    loadBooks: () => Promise<LoadBooks.Result | []>
}

export namespace LoadBooks {
    export type Result = BookModel[]
}
