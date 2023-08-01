import { useMemo, useState } from "react";

import { BookModel } from "@/domain/models";
import { ValidationComposite } from "@/main/composites";

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
import { Alert } from "../Alert";

type BookDetailsProps = {
    book: BookModel
    validator: ValidationComposite
}

type BookField = {
    fieldName: string
    label: string
    value: string | number
    isEditing: boolean
    fieldType: string
    testId: string
}

const convertToCapitalizeCase = (text: string) => {
    const convertedText = text.replace(/([A-Z])/g, " $1")
    return convertedText.charAt(0).toUpperCase().trim() + convertedText.slice(1).toLowerCase();
}

export function BookDetails({ book, validator }: BookDetailsProps) {
    const fieldNames = Object.keys(book)
    const [error, setError] = useState<string>()
    const [editableBook, setEditableBook] = useState<BookModel>(book)
    const [bookFields, setBookFields] = useState<BookField[]>(
        fieldNames.map((fieldName: string) => ({
            fieldName: fieldName,
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

    const setBookFieldByFieldName = (fieldName: string, targetKey: string, value: string | boolean) => {
        const bookFiedlsEditted = bookFields.map((bookField: BookField) => {
            if (bookField.fieldName === fieldName) {
                return {
                    ...bookField,
                    [targetKey]: value,
                }
            }
            return bookField
        })
        setBookFields(bookFiedlsEditted)
    }

    const setEditableBookContentByFieldName = (fieldName: string, value: string) => {
        setEditableBook({
            ...editableBook,
            [fieldName]: value,
        })
        setBookFieldByFieldName(fieldName, 'value', value)
    }

    const validateEditableField = (fieldName: string): string => {
        const fieldTexts = {}
        fieldNames.forEach(
            (fieldName: string) =>
            fieldTexts[fieldName] = bookFields.find((field) => field.fieldName === fieldName).value
        )
        const error = validator.validate(
            fieldName,
            fieldTexts,
        )
        return error
    }

    const handleEditModeByFieldName = (fieldName: string) => {
        const bookField = bookFields.find((field) => field.fieldName === fieldName)
        const isSaveFieldFlow = bookField.isEditing
        if (isSaveFieldFlow) {
            const error = validateEditableField(fieldName)
            if (error) return setError(error)
        }
        setBookFieldByFieldName(fieldName, 'isEditing', !bookField.isEditing)
    }

    const renderError = (error: string) => {
        return (
            <Alert testId="book-details-error-warn">
                {convertToCapitalizeCase(error)}
            </Alert>
        )
    }

    return (
        <ContainerStyled>
            {error && renderError(error)}

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
                                    onChange={(event) => setEditableBookContentByFieldName(book.fieldName, event.target.value)}
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
                            onClick={() => handleEditModeByFieldName(book.fieldName)}
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