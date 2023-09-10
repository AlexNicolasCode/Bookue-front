import { GetServerSideProps } from "next";
import { useState } from "react";

import { Header, MainContent, NoteList, Option, Options } from "@/presentation/components";
import { NoteModel } from "@/domain/models";
import { ModeProvider } from "@/presentation/contexts";

type NotesPageProps = {
    notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
    const [listedNotes, setListedNotes] = useState<NoteModel[]>(notes)

    return (
        <ModeProvider>
            <Header/>
            <MainContent>
                <NoteList notes={listedNotes}/>
                <Options
                    options={[Option.DeleteNote, Option.AddNote]}
                />
            </MainContent>
        </ModeProvider>
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