import { ReactNode, useCallback, useState } from 'react'

import { BookFormContext } from './context'
import { BookForm } from './types'

type BookFormContextProviderProps = {
  children: ReactNode
}

export function BookFormContextProvider({ children }: BookFormContextProviderProps) {
  const defaultBookForm = {
    title: {
      isWrongFill: false,
      text: '',
    },
    author: {
      isWrongFill: false,
      text: '',
    },
    pages: {
      isWrongFill: false,
      text: '',
    },
    description: {
      isWrongFill: false,
      text: '',
    },
    currentPage: {
      isWrongFill: false,
      text: '',
    },
  }
  const [bookForm, setBookForm] = useState<BookForm>(defaultBookForm)

  const setField = useCallback((field: string, text: string): void =>
    setBookForm({
      ...bookForm,
      [field]: {
        isWrongFill: false,
        text: text,
      },
    }), [bookForm])

  const setWrongFillField = useCallback((field: string): void => {
    setBookForm({
      ...bookForm,
      [field]: {
        isWrongFill: true,
        text: bookForm[field].text,
      },
    })
  }, [bookForm])

  return (
    <BookFormContext.Provider
      value={{
        bookForm,
        setField,
        setWrongFillField,
      }}
    >
      {children}
    </BookFormContext.Provider>
  )
}
