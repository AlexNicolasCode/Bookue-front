import Link from 'next/link'

import { BookModel } from '@/domain/models'
import env from '@/main/config/env'

import {
  CardStyled,
  CountPageStyled,
  DescriptionStyled,
  OptionStyled,
  HeaderStyled,
  OptionsStyled,
  TitleStyled,
} from './styles'

type CardProps = {
  book: BookModel
}

export function Card({ book }: CardProps) {
  const renderOptions = () => (
    <OptionsStyled>
      {env.SCREEN.NOTES &&
        <Link href={`/book/${book.id}/notes`} passHref>
          <OptionStyled isBorded data-test-id='home-book-notes-button'>Notes</OptionStyled>
        </Link>
      }
      {env.SCREEN.DETAILS &&
        <Link href={`/book/${book.id}`} passHref>
          <OptionStyled
            isBorded={!env.SCREEN.NOTES}
            data-test-id='home-book-details-button'
          >
            Details
          </OptionStyled>
        </Link>
      }
    </OptionsStyled>
  )

  return (
    <CardStyled data-test-id='home-book-card'>
      <HeaderStyled>
        <TitleStyled data-test-id='home-book-title'>{book.title}</TitleStyled>
        <CountPageStyled data-test-id='home-book-pages'>
          {book.currentPage ?? 0} - {book.pages}
        </CountPageStyled>
      </HeaderStyled>

      <DescriptionStyled data-test-id='home-book-description'>{book.description}</DescriptionStyled>

      {renderOptions()}
    </CardStyled>
  )
}
