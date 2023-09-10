import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { Header, Input, MainContent, NoteList, Option, Options } from "@/presentation/components";
import { NoteModel } from "@/domain/models";
import { useModeController } from "@/presentation/hook";
import { Modes } from "@/presentation/contexts";

import { AddNoteContainer } from "./styles";

type NotesPageProps = {
    notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
    const [listedNotes, setListedNotes] = useState<NoteModel[]>(notes)
    const [newNote, setNewNote] = useState<string>('')
    const { mode } = useModeController()

    return (
        <>
            <Header/>
            <MainContent>
                <NoteList notes={listedNotes}/>
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

export const getServerSideProps: GetServerSideProps = async () => {
    const note: NoteModel = {
        id: '111',
        text: 'testing testing  testing testingtestingtesting testing testing testing testing testing testingtesting testing testing testing'
    }
    return {
        props: {
            notes: [
                note,
                note,
                note,
                note,
                note,
                note,
            ],
        },
    }
}