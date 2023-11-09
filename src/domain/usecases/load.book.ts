import { BookModel } from '../models'

export interface LoadBook {
  loadBook: (params: LoadBook.Params) => Promise<LoadBook.Result | []>
}

export namespace LoadBook {
  export type Params = {
    accessToken: string
    bookId: string
  }
  export type Result = BookModel
}
