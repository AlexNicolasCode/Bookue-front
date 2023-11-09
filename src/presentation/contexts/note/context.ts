import { Dispatch, createContext } from 'react'

import { NoteModel } from '@/domain/models'

type NoteContextData = {
  notes: NoteModel[]
  setNotes: Dispatch<NoteModel[]>
  newNote: string
  setNewNote: Dispatch<string>
  addNote: () => void
  deleteNote: (noteId: string) => void
}

export const NoteContext = createContext({} as NoteContextData)
