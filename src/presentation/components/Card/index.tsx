import Link from 'next/link'

import { BookModel } from '@/domain/models'

import {
  CardStyled,
  CountPageStyled,
  DescriptionStyled,
  DetailsOptionStyled,
  HeaderStyled,
  NotesOptionStyled,
  OptionsStyled,
  TitleStyled,
} from './styles'

type CardProps = {
  book: BookModel
}

export function Card({ book }: CardProps) {
  return (
    <CardStyled data-test-id='home-book-card'>
      <HeaderStyled>
        <TitleStyled data-test-id='home-book-title'>{book.title}</TitleStyled>
        <CountPageStyled data-test-id='home-book-pages'>
          {book.currentPage ?? 0} - {book.pages}
        </CountPageStyled>
      </HeaderStyled>

      <DescriptionStyled data-test-id='home-book-description'>{book.description}</DescriptionStyled>

      <OptionsStyled>
        <Link href={`/book/${book.id}/notes`} passHref>
          <NotesOptionStyled data-test-id='home-book-notes-button'>Notes</NotesOptionStyled>
        </Link>
        <Link href={`/book/${book.id}`} passHref>
          <DetailsOptionStyled data-test-id='home-book-details-button'>Details</DetailsOptionStyled>
        </Link>
      </OptionsStyled>
    </CardStyled>
  )
}
