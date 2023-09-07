import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { NoteModel } from "@/domain/models";

import { AddNoteOptionStyled, NoteListStyled, NoteStyled } from "./styles";

type NoteListProps = {
    notes: NoteModel[]
}

export function NoteList ({ notes }: NoteListProps) {
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
            <AddNoteOptionStyled>
                <FontAwesomeIcon icon={faPlus}/>
            </AddNoteOptionStyled>
        </>
    )
}