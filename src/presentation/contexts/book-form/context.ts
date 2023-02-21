import { createContext } from "react"

import { BookForm } from "./types"

type BookFormContextData = {
    bookForm: BookForm
    setField: (field: string, text: string) => void
}

export const BookFormContext = createContext({} as BookFormContextData)