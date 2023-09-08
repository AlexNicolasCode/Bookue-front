import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";

import { Header, MainContent, Modes, NoteList, OptionName } from "@/presentation/components";
import { NoteModel } from "@/domain/models";
import { FooterOptions } from "@/presentation/components";

type NotesPageProps = {
    notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
    const [listedNotes, setListedNotes] = useState<NoteModel[]>(notes)
    const [mode, setMode] = useState<Modes>(Modes.Default)

    const notesCount = notes.length
    const maxNotesBeforeHideAddBookButton = 3
    const shouldHaveAddBookInNoteList = notesCount <= maxNotesBeforeHideAddBookButton

    const options: OptionName[] = useMemo(() => {
        const optionsMapper = {
            [Modes.DeleteMode]: [OptionName.DeleteMode, OptionName.AddNote],
            [Modes.AddMode]: [OptionName.AddNote],
            [Modes.Default]: [OptionName.DeleteMode, OptionName.AddNote],
        }
        return optionsMapper[mode]
    }, [mode])

    const changeMode = (targetMode: Modes) => {
        setMode(mode !== targetMode ? targetMode : Modes.Default)
    }

    const handleMode = (option: OptionName) => {
        const modeMapper = {
            [OptionName.DeleteMode]: () => changeMode(Modes.DeleteMode),
            [OptionName.AddNote]: () => changeMode(Modes.AddMode),
            [OptionName.RemoveNote]: () => {},
        }
        modeMapper[option]()
    }

    return (
        <>
            <Header/>
            <MainContent>
                <NoteList
                    notes={listedNotes}
                    isActiveAddNoteButton={shouldHaveAddBookInNoteList}
                    mode={mode}
                />
                <FooterOptions
                    options={options}
                    mode={mode}
                    handleMethod={handleMode}
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