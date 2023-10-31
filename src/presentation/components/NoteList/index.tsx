import { NoteModel } from "@/domain/models";
import { Options, Option } from "../Options";
import { Modes } from "@/presentation/contexts";
import { useModeController, useTextConverter } from "@/presentation/hook";

import {
    Note,
    DeleteModeOptionsContainer,
    DeleteModeContainer,
    NoteText,
    NoteDelete,
    NoteListAddMode,
    NoteListDefault,
} from "./styles";

type NoteListProps = {
    notes: NoteModel[]
 }

export function NoteList ({ notes }: NoteListProps) {
    const { truncateText } = useTextConverter()
    const { mode } = useModeController()

    const maxCharTruncate = 750

    const renderNoteList = () => 
        <NoteListDefault>
            {notes.map((note, index) => {
                const text = truncateText(note.text, maxCharTruncate)
                return (
                    <Note
                        id={note.id}
                        data-test-id={'notes-note-card'}
                        key={index}
                    >
                        <NoteText>
                            {text}
                        </NoteText>
                    </Note>
                )
            })}
        </NoteListDefault>

    const renderNotesListDeleteMode = () => 
        <NoteListDefault>
            {notes.map((note, index) => 
                <DeleteModeContainer key={index}>
                    <NoteDelete
                        id={note.id}
                        data-test-id={'notes-note-card-delete-mode'}
                    >
                        {truncateText(note.text, maxCharTruncate)}
                    </NoteDelete>
                    <DeleteModeOptionsContainer>
                        <Options
                            options={[Option.RemoveNote]}
                            config={{
                                isFixedOptions: true,
                            }}
                        />
                    </DeleteModeOptionsContainer>
                </DeleteModeContainer>
            )}
        </NoteListDefault>

    const renderNotesListAddMode = () => 
        <NoteListAddMode>
            {notes.map((note, index) => {
                const text = truncateText(note.text, maxCharTruncate)
                return (
                    <Note
                        id={note.id}
                        data-test-id={'notes-note-card'}
                        key={index}
                    >
                        <NoteText>
                            {text}
                        </NoteText>
                    </Note>
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

    return renderNoteListByMode()
}