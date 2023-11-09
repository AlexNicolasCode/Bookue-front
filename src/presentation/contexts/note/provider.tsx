import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NoteContext } from './context'
import { NoteModel } from '@/domain/models'
import { useModeController } from '@/presentation/hook'
import { Modes } from '../mode'
import { makeAddNote, makeDeleteNote } from '@/main/factory/usecases'

type NoteProviderProps = {
  children: ReactNode
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const router = useRouter()
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [newNote, setNewNote] = useState<string>('')
  const { mode, lastMode } = useModeController()
  const remoteAddNote = makeAddNote()
  const remoteDeleteNote = makeDeleteNote()

  const shouldAddNoteInList =
    newNote &&
    newNote.trim() !== '' &&
    lastMode.current === Modes.AddMode &&
    mode === Modes.DefaultMode

  useEffect(() => {
    if (shouldAddNoteInList) {
      addNote()
    }
  }, [mode])

  const addNote = async () => {
    const bookId = router.query.id.toString()
    const createdNote = await remoteAddNote.add({
      bookId,
      text: newNote,
    })
    setNotes([
      {
        id: createdNote.id,
        text: newNote,
      },
      ...notes,
    ])
    setNewNote('')
  }

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    remoteDeleteNote.delete({ noteId, bookId: String(router.query['id']) })
    setNotes(updatedNotes)
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        newNote,
        setNewNote,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}
