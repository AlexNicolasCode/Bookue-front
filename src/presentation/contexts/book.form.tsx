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
    bookForm: BookForm;
};

export const BookFormContext = createContext({} as BookFormContextData)

type BookFormContextProviderProps = {
    children: ReactNode;
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

    return (
      <BookFormContext.Provider 
        value={{ 
            bookForm,
        }}>
        { children }
      </BookFormContext.Provider>
    )
}