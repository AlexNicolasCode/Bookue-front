import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";
import { FooterOptions } from "../FooterOptions";
import { Modes, Option } from "@/presentation/contexts";
import { useMode } from "@/presentation/hook";

import {
    AddNoteOptionStyled,
    NoteListStyled,
    NoteStyled,
    OptionsStyled,
    OptionsNoteStyled,
    NoteCustomModeStyled,
    ModeActivetedContainerStyled,
} from "./styles";

type NoteListProps = {
    notes: NoteModel[]
 }

export function NoteList ({ notes }: NoteListProps) {
    const { mode, changeMode } = useMode()

    const shouldHaveAddBook = useMemo(() => {
        if (mode !== Modes.DefaultMode) {
            return false
        }
        const notesCount = notes.length
        const maxNotesBeforeHideAddBookButton = 3
        return notesCount <= maxNotesBeforeHideAddBookButton
    }, [notes])

    const getCuttedText = (text: string) => {
        const maxChar = 750
        if (text.length > maxChar) {
            const partialText = text.slice(0, maxChar)
            return `${partialText}...`
        }
        return text
    }

    const renderNoteList = () => 
        <NoteListStyled>
            {notes.map((note, index) => {
                const text = getCuttedText(note.text)
                return (
                    <NoteStyled
                        id={note.id}
                        data-test-id={'notes-note-card'}
                        key={index}
                    >
                        {text}
                    </NoteStyled>
                )
            })}
        </NoteListStyled>

    const renderNotesListDeleteMode = () => 
        <NoteListStyled>
            {notes.map((note, index) => 
                <ModeActivetedContainerStyled>
                    <NoteCustomModeStyled
                        id={note.id}
                        mode={mode}
                        data-test-id={'notes-note-card-delete-mode'}
                        key={index}
                    >
                        {getCuttedText(note.text)}
                    </NoteCustomModeStyled>
                    <OptionsNoteStyled>
                        <FooterOptions
                            options={[Option.RemoveNote]}
                            isWithoutBackground={true}
                        />
                    </OptionsNoteStyled>
                </ModeActivetedContainerStyled>
            )}
        </NoteListStyled>

    const renderNoteListAccordingMode = () => {
        const modeMapper = {
            [Modes.DeleteMode]: renderNotesListDeleteMode,
            [Modes.DefaultMode]: renderNoteList,
        }
        return modeMapper[mode]()
    }

    return (
        <>
            {renderNoteListAccordingMode()}
            {shouldHaveAddBook && 
                <OptionsStyled>
                    <AddNoteOptionStyled onClick={() => changeMode(Modes.AddMode)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </AddNoteOptionStyled>
                </OptionsStyled>
            }
        </>
    )
}