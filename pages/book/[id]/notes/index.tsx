import { GetServerSideProps } from 'next'

import {
  Header,
  MainContent,
  NoteList,
  Option,
  Options,
  AddNoteContainer,
} from '@/presentation/components'
import { NoteModel } from '@/domain/models'
import { useModeController } from '@/presentation/hook'
import { Modes } from '@/presentation/contexts'
import { makeLoadNotes } from '@/main/factory/usecases'
import { NoteProvider } from '@/presentation/contexts/note'

type NotesPageProps = {
  notes: NoteModel[]
}

export default function NotesPage({ notes }: NotesPageProps) {
  const { mode } = useModeController()
  return (
    <>
      <Header />
      <MainContent>
        <NoteProvider>
          <NoteList ssrNotes={notes} />
          {mode === Modes.AddMode && <AddNoteContainer />}
          <Options
            options={[Option.DeleteNote, Option.AddNote]}
            config={{
              hasBackground: true,
            }}
          />
        </NoteProvider>
      </MainContent>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies['bookue-user'].toString()
  const bookId = context.params['id'].toString()
  const remoteLoadNotes = makeLoadNotes()
  const notes = await remoteLoadNotes.loadNotes({ accessToken, bookId })
  return {
    props: {
      notes,
    },
  }
}
