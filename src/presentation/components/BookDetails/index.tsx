import { useCallback, useMemo, useRef } from 'react'

import { BookModel } from '@/domain/models'
import { makeEditBookValidation } from '@/main/factory/validation'
import { Field } from '../Field'

import {
  ContainerStyled,
  DetailsContainerStyled,
  HeaderStyled,
  LateralContainerStyled,
  ProgressBarStyled,
  TextStyled,
  TitleStyled,
} from './styles'

type BookDetailsProps = {
  book: BookModel
}

export function BookDetails({ book }: BookDetailsProps) {
  const fieldNames = useRef(['title', 'author', 'description', 'currentPage', 'pages'])
  
  const bookProgressPercentage = useMemo(() => {
    const percentage = String((book.currentPage * 100) / book.pages)
    return `${percentage.substring(0, 4)}%`
  }, [book.currentPage, book.pages])
  
  const validateField = useCallback((fieldName: string, value: string): string | undefined => {
    const fieldTexts = {}
    fieldNames.current.forEach(
      (name: string) => fieldTexts[name] = (name === fieldName ? value : book[name])
    )
    const validator = makeEditBookValidation()
    const error = validator.validate(fieldName, fieldTexts)
    return error
  }, [book])

  const renderHeader = useCallback((): JSX.Element => (
    <HeaderStyled>
      <TitleStyled data-test-id='book-details-title'>{book.title}</TitleStyled>
      <LateralContainerStyled>
        <TextStyled>Progress</TextStyled>
        <ProgressBarStyled data-test-id='book-details-process-percentage'>
          {bookProgressPercentage}
        </ProgressBarStyled>
      </LateralContainerStyled>
    </HeaderStyled>
  ), [bookProgressPercentage])

  const renderFields = useCallback((): JSX.Element[] => 
    fieldNames.current.map((name: string, index: number) => {
      return <Field
        validateField={validateField}
        fieldName={name}
        text={book[name]}
        test={{ prefix: 'book-details' }}
        key={index}
      />
    })
  , [book, fieldNames.current])

  return (
    <ContainerStyled>
      {renderHeader()}
      <DetailsContainerStyled>
        {renderFields()}
      </DetailsContainerStyled>
    </ContainerStyled>
  )
}
