import { useNote } from "@/presentation/hook";
import { Input } from "../Input";

import { AddNoteContainerStyled } from "./styles";

export const AddNoteContainer = () => {
    const { newNote, setNewNote } = useNote()
    return (
        <AddNoteContainerStyled data-test-id="notes-add-note-input">
            <Input
                setState={setNewNote}
                value={newNote}
                style={{
                    isBorded: true,
                    height: '100%',
                    width: '100%',
                }}
            />
        </AddNoteContainerStyled>
    )
}