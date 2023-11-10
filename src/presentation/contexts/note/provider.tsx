import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { NoteContext } from './context'
import { NoteModel } from '@/domain/models'
import { useModeController } from '@/presentation/hook'
import { Modes } from '../mode'
import { makeAddNote, makeDeleteNote } from '@/main/factory/usecases'

type NoteProviderProps = {
  children: ReactNode
}

const remoteAddNote = makeAddNote()
const remoteDeleteNote = makeDeleteNote()

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const router = useRouter()
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [newNote, setNewNote] = useState<string>('')
  const { mode, lastMode } = useModeController()

  const shouldAddNoteInList = useMemo(() => 
    newNote &&
    newNote.trim() !== '' &&
    lastMode.current === Modes.AddMode &&
    mode === Modes.DefaultMode
  , [newNote, lastMode.current, mode])

  useEffect(() => {
    if (shouldAddNoteInList) {
      addNote()
    }
  }, [mode])

  const addNote = useCallback(async () => {
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
  }, [router.query.id, newNote, notes])

  const deleteNote = useCallback((noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    remoteDeleteNote.delete({ noteId, bookId: String(router.query['id']) })
    setNotes(updatedNotes)
  }, [notes])

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
