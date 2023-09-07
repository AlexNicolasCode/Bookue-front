import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";
import { FooterOptions, Modes, OptionName } from "../FooterOptions";

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
    isActiveAddNoteButton: boolean
    mode: Modes
}

export function NoteList ({ notes, isActiveAddNoteButton, mode }: NoteListProps) {
    const getCuttedText = (text: string) => {
        const maxChar = 750
        if (text.length > maxChar) {
            const partialText = text.slice(0, maxChar)
            return `${partialText}...`
        }
        return text
    }

    const handleMode = (option: OptionName) => {
        const modeMapper = {
            [OptionName.RemoveNote]: () => {},
        }
        const foundMethod = modeMapper[option]
        if (foundMethod) {
            foundMethod()
        }
    }

    const renderNotesWithDeleteMode = () =>
        notes.map((note, index) => 
            <ModeActivetedContainerStyled>
                <NoteCustomModeStyled
                    id={note.id}
                    mode={mode}
                    key={index}
                >
                    {getCuttedText(note.text)}
                </NoteCustomModeStyled>
                {mode === Modes.DeleteMode &&
                    <OptionsNoteStyled>
                        <FooterOptions
                            options={[OptionName.RemoveNote]}
                            mode={mode}
                            isWithoutBackground={true}
                            handleMethod={handleMode}
                        />
                    </OptionsNoteStyled>
                }
            </ModeActivetedContainerStyled>
        )

    const renderNotes = () =>
        notes.map((note, index) => {
            const text = getCuttedText(note.text)
            return (
                <NoteStyled id={note.id} key={index}>
                    {text}
                </NoteStyled>
            )
        })

    const renderNoteList = () => 
        <NoteListStyled>
            {renderNotes()}
        </NoteListStyled>

    const renderNotesListWithDeleteMode = () => 
        <NoteListStyled>
            {renderNotesWithDeleteMode()}
        </NoteListStyled>

    return (
        <>
            {mode === Modes.DeleteMode ? renderNotesListWithDeleteMode() : renderNoteList()}
            {mode === Modes.Default && isActiveAddNoteButton && 
                <OptionsStyled>
                    <AddNoteOptionStyled>
                        <FontAwesomeIcon icon={faPlus}/>
                    </AddNoteOptionStyled>
                </OptionsStyled>
            }
        </>
    )
}