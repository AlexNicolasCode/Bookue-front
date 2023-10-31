import { ReactNode, useEffect, useState } from "react"
import { faker } from "@faker-js/faker"

import { NoteContext } from "./context"
import { NoteModel } from "@/domain/models"
import { useModeController } from "@/presentation/hook"
import { Modes } from "../mode"

type NoteProviderProps = {
    children: ReactNode
}

export const NoteProvider = ({ children }: NoteProviderProps) => {   
    const [notes, setNotes] = useState<NoteModel[]>([])
    const [newNote, setNewNote] = useState<string>('')
    const { mode, lastMode } = useModeController()

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

    const addNote = () => {
        setNotes([
            {
                id: faker.datatype.uuid(),
                text: newNote,
            },
            ...notes,
        ])
    }
    
    const deleteNote = (noteId: string) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId)
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