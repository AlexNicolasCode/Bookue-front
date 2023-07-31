import { useMemo, useState } from "react";

import { BookModel } from "@/domain/models";
import {
    ContainerStyled,
    DetailsContainerStyled,
    EditButtonStyled,
    FieldContainerStyled,
    FieldContentEditingModeStyled,
    FieldContentStyled,
    FieldLabelStyled,
    FieldStyled,
    HeaderStyled,
    LateralContainerStyled,
    ProgressBarStyled,
    TextStyled,
    TitleStyled,
} from "./styles";

type BookDetailsProps = {
    book: BookModel
}

type BookField = {
    label: string
    value: string | number
    isEditing: boolean
    fieldType: string
    testId: string
}

const convertToCapitalizeCase = (text: string) => {
    const textD = text.replace(/([A-Z])/g, " $1")
    return textD.charAt(0).toUpperCase() + textD.slice(1).toLowerCase();
}

export function BookDetails({ book }: BookDetailsProps) {
    const fieldsNames = Object.keys(book)
    const [editableBook, setEditableBook] = useState<BookModel>(book)
    const [bookFields, setBookFields] = useState<BookField[]>(
        fieldsNames.map((fieldName: string) => ({
            label: convertToCapitalizeCase(fieldName),
            value: editableBook[fieldName],
            isEditing: false,
            fieldType: 'text',
            testId: `book-details-${fieldName}-field`,
        }))
    )

    const bookProgressPercentage = useMemo(() => {
        const percentage = String((editableBook.currentPage * 100) / editableBook.pages);
        return `${percentage.substring(0, 4)}%`
    }, [editableBook.currentPage, editableBook.pages])


    const setBookFieldByLabel = (label: string, targetLabel: string, value: string | boolean) => {
        const bookFiedlsEditted = bookFields.map((bookField: BookField) => {
            if (bookField.label === label) {
                return {
                    ...bookField,
                    [targetLabel]: value,
                }
            }
            return bookField
        })
        setBookFields(bookFiedlsEditted)
    }

    const setEditableBookContentByLabel = (label: string, value: string) => {
        setEditableBook({
            ...editableBook,
            [label]: value,
        })
        setBookFieldByLabel(label, 'value', value)
    }

    const handleEditModeByLabel = (label: string) => {
        const bookField = bookFields.find((field) => field.label === label)
        setBookFieldByLabel(label, 'isEditing', !bookField.isEditing)
    }

    return (
        <ContainerStyled>
            <HeaderStyled>
                <TitleStyled data-test-id="book-details-title">{book.title}</TitleStyled>

                <LateralContainerStyled>
                    <TextStyled>Progress</TextStyled>
                    <ProgressBarStyled data-test-id="book-details-process-percentage">
                        {bookProgressPercentage}
                    </ProgressBarStyled>
                </LateralContainerStyled>
            </HeaderStyled>

            <DetailsContainerStyled>
                {bookFields.map((book, index) =>
                    <FieldContainerStyled key={index}>
                        {book.isEditing
                            ?
                            <FieldStyled>
                                <FieldLabelStyled>{book.label}</FieldLabelStyled>
                                <FieldContentEditingModeStyled
                                    onChange={(event) => setEditableBookContentByLabel(book.label, event.target.value)}
                                    type={book.fieldType}
                                    value={book.value}
                                    data-test-id={`${book.testId}-edit-mode`}
                                />
                            </FieldStyled>
                            :
                            <FieldStyled>
                                <FieldLabelStyled data-test-id={`${book.testId}-label`}>{book.label}</FieldLabelStyled>
                                <FieldContentStyled data-test-id={book.testId}>{book.value}</FieldContentStyled>
                            </FieldStyled>
                        }

                        <EditButtonStyled
                            onClick={() => handleEditModeByLabel(book.label)}
                            data-test-id={`${book.testId}-edit-button`}
                        >
                            Edit
                        </EditButtonStyled>
                    </FieldContainerStyled>
                )}
            </DetailsContainerStyled>
        </ContainerStyled>
    )
}