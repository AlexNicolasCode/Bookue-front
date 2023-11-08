import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { NoteContext } from "./context"
import { NoteModel } from "@/domain/models"
import { useModeController } from "@/presentation/hook"
import { Modes } from "../mode"
import { makeAddNote, makeDeleteNote, makeLoadNotes } from "@/main/factory/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"

type NoteProviderProps = {
    children: ReactNode
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
    const router = useRouter()
    const [notes, setNotes] = useState<NoteModel[]>([])
    const [newNote, setNewNote] = useState<string>('')
    const { mode, lastMode } = useModeController()
    const remoteAddNote = makeAddNote()
    const remoteLoadNotes = makeLoadNotes()
    const remoteDeleteNote = makeDeleteNote()
    const cookieManager = makeCookieManagerAdapter()

    const shouldAddNoteInList =
        newNote
        && newNote.trim() !== ''
        && lastMode.current === Modes.AddMode
        && mode === Modes.DefaultMode

    useEffect(() => {
        if (shouldAddNoteInList) {
            addNote()
        }
    }, [mode])

    const addNote = async () => {
        const bookId = router.query.id.toString()
        await remoteAddNote.add({
            bookId,
            text: newNote,
        })
        const accessToken = await cookieManager.load('bookue-user')
        const notes = await remoteLoadNotes.loadNotes({
            bookId,
            accessToken,
        })
        setNotes(notes)
        setNewNote('')
    }
    
    const deleteNote = (noteId: string) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId)
        remoteDeleteNote.delete({ noteId, bookId: String(router.query['id']), })
        setNotes(updatedNotes)
    }
    
    return (
        <NoteContext.Provider value={{
            notes,
            setNotes,
            newNote,
            setNewNote,
            addNote,
            deleteNote,
        }}>
            {children}
        </NoteContext.Provider>
    )
}