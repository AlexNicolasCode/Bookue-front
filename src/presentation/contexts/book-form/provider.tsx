import { ReactNode, useState } from "react"

import { BookFormContext } from "./context"
import { BookForm } from "./types"

type BookFormContextProviderProps = {
    children: ReactNode
}

export function BookFormContextProvider({ children }: BookFormContextProviderProps) {
    const defaultBookForm = {
        title: {
            isWrongFill: false,
            text: ''
        },
        author: {
            isWrongFill: false,
            text: ''
        },
        pages: {
            isWrongFill: false,
            text: ''
        },
        description: {
            isWrongFill: false,
            text: ''
        },
        currentPage: {
            isWrongFill: false,
            text: ''
        },
    }
    const [bookForm, setBookForm] = useState<BookForm>(defaultBookForm)

    const setField = (field, text: string): void => setBookForm({ 
        ...bookForm,
        [field]: {
            text: text
        },
    })

    const cleanAllWrongFields = (): void => {
        setBookForm(defaultBookForm)
    }

    return (
      <BookFormContext.Provider 
        value={{ 
            bookForm,
            setField,
            cleanAllWrongFields,
        }}>
        { children }
      </BookFormContext.Provider>
    )
}