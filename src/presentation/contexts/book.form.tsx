import { createContext, ReactNode, useState } from "react";

type BookForm = {
    title: {
        text: string
    },
    author: {
        text: string
    },
    pages: {
        text: string
    },
    description: {
        text: string
    },
    currentPage: {
        text: string
    },
}

type BookFormContextData = {
    bookForm: BookForm
    setField: (field: string, text: string) => void
}

export const BookFormContext = createContext({} as BookFormContextData)

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