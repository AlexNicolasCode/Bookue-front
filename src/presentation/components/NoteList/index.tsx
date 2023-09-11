import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";
import { Options, Option } from "../Options";
import { Modes } from "@/presentation/contexts";
import { useModeController, useTextConverter } from "@/presentation/hook";

import {
    AddNoteOptionStyled,
    NoteStyled,
    OptionsStyled,
    OptionsNoteStyled,
    ModeActivetedContainerStyled,
    TextStyled,
    NoteDelete,
    NoteListAddMode,
    NoteListDefault,
} from "./styles";

type NoteListProps = {
    notes: NoteModel[]
 }

export function NoteList ({ notes }: NoteListProps) {
    const { truncateText } = useTextConverter()
    const { mode, changeMode } = useModeController()

    const maxCharTruncate = 750

    const shouldHaveAddBook = useMemo(() => {
        if (mode !== Modes.DefaultMode) {
            return false
        }
        const notesCount = notes.length
        const maxNotesBeforeHideAddBookButton = 3
        return notesCount <= maxNotesBeforeHideAddBookButton
    }, [notes])

    const renderNoteList = () => 
        <NoteListDefault>
            {notes.map((note, index) => {
                const text = truncateText(note.text, maxCharTruncate)
                return (
                    <NoteStyled
                        id={note.id}
                        data-test-id={'notes-note-card'}
                        key={index}
                    >
                        <TextStyled>
                            {text}
                        </TextStyled>
                    </NoteStyled>
                )
            })}
        </NoteListDefault>

    const renderNotesListDeleteMode = () => 
        <NoteListDefault>
            {notes.map((note, index) => 
                <ModeActivetedContainerStyled>
                    <NoteDelete
                        id={note.id}
                        data-test-id={'notes-note-card-delete-mode'}
                        key={index}
                    >
                        {truncateText(note.text, maxCharTruncate)}
                    </NoteDelete>
                    <OptionsNoteStyled>
                        <Options
                            options={[Option.RemoveNote]}
                            config={{
                                isFixedOptions: true,
                            }}
                        />
                    </OptionsNoteStyled>
                </ModeActivetedContainerStyled>
            )}
        </NoteListDefault>

    const renderNotesListAddMode = () => 
        <NoteListAddMode>
            {notes.map((note, index) => {
                const text = truncateText(note.text, maxCharTruncate)
                return (
                    <NoteStyled
                        id={note.id}
                        data-test-id={'notes-note-card'}
                        key={index}
                    >
                        <TextStyled>
                            {text}
                        </TextStyled>
                    </NoteStyled>
                )
            })}
        </NoteListAddMode>

    const renderNoteListByMode = () => {
        const modeMapper = {
            [Modes.AddMode]: renderNotesListAddMode,
            [Modes.DeleteMode]: renderNotesListDeleteMode,
            [Modes.DefaultMode]: renderNoteList,
        }
        return modeMapper[mode]()
    }

    return (
        <>
            {renderNoteListByMode()}
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