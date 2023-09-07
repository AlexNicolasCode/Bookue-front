import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";

import { AddNoteOptionStyled, NoteListStyled, NoteStyled, OptionsStyled } from "./styles";

type NoteListProps = {
    notes: NoteModel[]
    isActiveAddNoteButton: boolean
}

export function NoteList ({ notes, isActiveAddNoteButton }: NoteListProps) {
    const getCuttedText = (text: string) => {
        const maxChar = 750
        if (text.length > maxChar) {
            const partialText = text.slice(0, maxChar)
            return `${partialText}...`
        }
        return text
    }

    const renderNotes = () =>
        notes.map((note) => {
            const text = getCuttedText(note.text)
            return (
                <NoteStyled id={note.id}>
                    {text}
                </NoteStyled>
            )
        })

    const renderNoteList = () => 
        <NoteListStyled>
            {renderNotes()}
        </NoteListStyled>

    return (
        <>
            {renderNoteList()}
            {isActiveAddNoteButton && 
                <OptionsStyled>
                    <AddNoteOptionStyled>
                        <FontAwesomeIcon icon={faPlus}/>
                    </AddNoteOptionStyled>
                </OptionsStyled>
            }
        </>
    )
}