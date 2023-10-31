import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";


import {
    Header,
    Input,
    MainContent,
    NoteList,
    Option,
    Options,
    AddNoteContainer,
} from "@/presentation/components";
import { NoteModel } from "@/domain/models";
import { useModeController } from "@/presentation/hook";
import { Modes } from "@/presentation/contexts";
import { makeRemoteLoadNotes } from "@/main/factory/usecases";

type NotesPageProps = {
    notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
    const [listedNotes, setListedNotes] = useState<NoteModel[]>(notes)
    const [newNote, setNewNote] = useState<string>('')
    const { mode, lastMode } = useModeController()

    useEffect(() => {
        if (shouldAddNoteInList) {
            addNoteInList()
        }
    }, [mode])

    const shouldAddNoteInList =
        newNote
        && newNote.trim() !== ''
        && lastMode.current === Modes.AddMode
        && mode === Modes.DefaultMode
    
    const addNoteInList = () => {
        setListedNotes([
            {
                id: faker.datatype.uuid(),
                text: newNote,
            },
            ...listedNotes,
        ])
        setNewNote('')
    }
    
    const deleteNote = (noteId: string) => {
        const updatedNotes = listedNotes.filter((note) => note.id !== noteId)
        setListedNotes(updatedNotes)
    }

    return (
        <>
            <Header/>
            <MainContent>
                <NoteList notes={listedNotes} deleteNote={deleteNote} />
                {mode === Modes.AddMode &&
                    <AddNoteContainer>
                        <Input
                            setState={setNewNote}
                            value={newNote}
                            style={{
                                isBorded: true,
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </AddNoteContainer>
                }
                <Options
                    options={[Option.DeleteNote, Option.AddNote]}
                    config={{
                        hasBackground: true,
                    }}
                />
            </MainContent>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const accessToken = context.req.cookies['bookue-user'].toString()
    const bookId = context.params['id'].toString()
    const remoteLoadNotes = makeRemoteLoadNotes()
    const notes = await remoteLoadNotes.loadNotes({ accessToken, bookId })
    return {
        props: {
            notes,
        },
    }
}