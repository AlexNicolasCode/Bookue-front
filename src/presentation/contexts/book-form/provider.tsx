import { ReactNode, useState } from "react"

import { BookFormContext } from "./context"
import { BookForm } from "./types"

type BookFormContextProviderProps = {
    children: ReactNode
}

export function BookFormContextProvider({ children }: BookFormContextProviderProps) {
    const [bookForm, setBookForm] = useState<BookForm>({
        title: {
            text: ''
        },
        author: {
            text: ''
        },
        pages: {
            text: ''
        },
        description: {
            text: ''
        },
        currentPage: {
            text: ''
        },
    })

    const setField = (field, text: string) => setBookForm({ 
        ...bookForm,
        [field]: {
            text: text
        },
    })

    return (
      <BookFormContext.Provider 
        value={{ 
            bookForm,
            setField,
        }}>
        { children }
      </BookFormContext.Provider>
    )
}