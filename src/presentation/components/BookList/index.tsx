import { BookModel } from '@/domain/models'
import { Card } from '../Card'
import { ListStyled } from './styles'

type BookListProps = {
  books: BookModel[]
}

export function BookList({ books }: BookListProps) {
  const renderBooks = () => {
    return books.map((book, index) => <Card book={book} key={index} />)
  }
  const renderEmptyState = () => {
    return <p data-test-id='home-empty-state'>Not found</p>
  }
  return <ListStyled>{books.length ? renderBooks() : renderEmptyState()}</ListStyled>
}
