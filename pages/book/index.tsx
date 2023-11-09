import { GetServerSideProps } from 'next'

import { BookDetails, Header } from '@/presentation/components'
import { BookModel } from '@/domain/models'

export type AddBookPageProps = {
  book: BookModel
}

function AddBookPage({ book }: AddBookPageProps) {
  return (
    <>
      <Header />
      <BookDetails book={book} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies['bookue-user']
  if (!accessToken) {
    return {
      props: {},
      redirect: {
        destination: '/login',
      },
    }
  }

  const book: BookModel = {
    id: String(1),
    title: 'Scherlock Holmes',
    author: 'Scherlock Holmes',
    description: 'Scherlock Holmes',
    currentPage: 10,
    pages: 1240,
    createdAt: new Date().toISOString(),
  }

  return {
    props: {
      book,
    },
  }
}

export default AddBookPage
