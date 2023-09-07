import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";

import { Header, MainContent, NoteList, OptionName } from "@/presentation/components";
import { NoteModel } from "@/domain/models";
import { FooterOptions } from "@/presentation/components";

type NotesPageProps = {
    notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
    const [listedNotes, setListedNotes] = useState<NoteModel[]>(notes)

    const notesCount = notes.length
    const maxNotesBeforeHideAddBookButton = 3
    const shouldHaveAddBookInNoteList = notesCount <= maxNotesBeforeHideAddBookButton

    const options: OptionName[] = useMemo(() => {
        if (shouldHaveAddBookInNoteList) {
            return [OptionName.DeleteMode]
        } else {
            return [OptionName.DeleteMode, OptionName.AddNote]
        }
    }, [shouldHaveAddBookInNoteList])

    return (
        <>
            <Header/>
            <MainContent>
                <NoteList notes={listedNotes} isActiveAddNoteButton={shouldHaveAddBookInNoteList}/>
                <FooterOptions options={options} />
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
            ],
        },
    }
}