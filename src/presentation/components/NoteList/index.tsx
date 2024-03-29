import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { NoteModel } from '@/domain/models'
import { Options, Option } from '../Options'
import { Modes } from '@/presentation/contexts'
import { useModeController, useNote, useTextConverter } from '@/presentation/hook'

import {
  Note,
  DeleteModeOptionsContainer,
  DeleteModeContainer,
  NoteText,
  NoteDelete,
  NoteListAddMode,
  NoteListDefault,
} from './styles'

type NoteListProps = {
  ssrNotes: NoteModel[]
}

export function NoteList({ ssrNotes }: NoteListProps) {
  const router = useRouter()
  const { truncateText } = useTextConverter()
  const { mode } = useModeController()
  const { notes, setNotes, deleteNote } = useNote()
  const maxCharTruncate = useRef(750);

  useEffect(() => {
    setNotes(ssrNotes)
  }, [router.pathname])

  const renderNoteList = useCallback(() => (
    <NoteListDefault>
      {notes.map((note, index) => {
        const text = truncateText(note.text, maxCharTruncate.current)
        return (
          <Note id={note.id} data-test-id={'notes-note-card'} key={index}>
            <NoteText>{text}</NoteText>
          </Note>
        )
      })}
    </NoteListDefault>
  ), [notes])

  const renderNotesListDeleteMode = useCallback(() => (
    <NoteListDefault>
      {notes.map((note, index) => (
        <DeleteModeContainer key={index}>
          <NoteDelete id={note.id} data-test-id={'notes-note-card-delete-mode'}>
            {truncateText(note.text, maxCharTruncate.current)}
          </NoteDelete>
          <DeleteModeOptionsContainer onClick={() => deleteNote(note.id)}>
            <Options
              options={[Option.RemoveNote]}
              config={{
                isFixedOptions: true,
              }}
            />
          </DeleteModeOptionsContainer>
        </DeleteModeContainer>
      ))}
    </NoteListDefault>
  ), [notes])

  const renderNotesListAddMode = useCallback(() => (
    <NoteListAddMode>
      {notes.map((note, index) => {
        const text = truncateText(note.text, maxCharTruncate.current)
        return (
          <Note id={note.id} data-test-id={'notes-note-card'} key={index}>
            <NoteText>{text}</NoteText>
          </Note>
        )
      })}
    </NoteListAddMode>
  ), [notes])

  const renderNoteListByMode = useCallback(() => {
    const modeMapper = {
      [Modes.AddMode]: renderNotesListAddMode,
      [Modes.DeleteMode]: renderNotesListDeleteMode,
      [Modes.DefaultMode]: renderNoteList,
    }
    return modeMapper[mode]()
  }, [mode, renderNoteList])

  return renderNoteListByMode()
}
