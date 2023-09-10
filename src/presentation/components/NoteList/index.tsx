import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";
import { Options, Option } from "../Options";
import { Modes } from "@/presentation/contexts";
import { useModeController } from "@/presentation/hook";

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
    const { mode, changeMode } = useModeController()

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
                        <Options
                            options={[Option.RemoveNote]}
                            config={{
                                hasBackground: true
                            }}
                        />
                    </OptionsNoteStyled>
                </ModeActivetedContainerStyled>
            )}
        </NoteListStyled>

    const renderNotesListAddMode = () => 
        <NoteListStyled mode={Modes.AddMode}>
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

    const renderNoteListAccordingMode = () => {
        const modeMapper = {
            [Modes.AddMode]: renderNotesListAddMode,
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