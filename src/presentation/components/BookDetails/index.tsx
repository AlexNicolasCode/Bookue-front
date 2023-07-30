import { useState } from "react";

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
    testId: string
}

export function BookDetails({ book }: BookDetailsProps) {
    const [editableBook, setEditableBook] = useState<BookModel>(book)
    const [bookFields, setBookFields] = useState<BookField[]>([
        {
            label: "Title",
            value: editableBook.title,
            isEditing: false,
            testId: "book-details-title-field"
        },
        {
            label: "Author",
            value: editableBook.author,
            isEditing: false,
            testId: "book-details-author-field"
        },
        {
            label: "Description",
            value: editableBook.description,
            isEditing: false,
            testId: "book-details-description-field"
        },
        {
            label: "Current Page",
            value: editableBook.currentPage,
            isEditing: false,
            testId: "book-details-current-page-field"
        },
        {
            label: "Pages",
            value: editableBook.pages,
            isEditing: false,
            testId: "book-details-pages-field"
        },
    ])

    const getBookProgressPerCent = () => {
        const perCent = String((editableBook.currentPage * 100) / editableBook.pages);
        return perCent.substring(0, 4)
    }

    const getTypeByLabel = (label: string) => {
        return label === "Current Page" || label === "Pages" ? "number" : "text"
    }

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
        setBookFieldByLabel(label, "value", value)
    }

    const handleEditModeByLabel = (label: string) => {
        const bookField = bookFields.find((field) => field.label === label)
        setBookFieldByLabel(label, "isEditing", !bookField.isEditing)
    }

    return (
        <ContainerStyled>
            <HeaderStyled>
                <TitleStyled data-test-id="book-details-title">{book.title}</TitleStyled>

                <LateralContainerStyled>
                    <TextStyled>Progress</TextStyled>
                    <ProgressBarStyled>
                        {getBookProgressPerCent()}%
                    </ProgressBarStyled>
                </LateralContainerStyled>
            </HeaderStyled>

            <DetailsContainerStyled>
                {bookFields.map((book, index) =>
                    <FieldContainerStyled key={index}>
                        {book.isEditing
                            ?
                            <FieldStyled>
                                <FieldLabelStyled>{ book.label }</FieldLabelStyled>
                                <FieldContentEditingModeStyled
                                    onChange={(event) => setEditableBookContentByLabel(book.label, event.target.value)}
                                    type={getTypeByLabel(book.label)}
                                    value={ book.value }
                                />
                            </FieldStyled>
                            :
                            <FieldStyled>
                                <FieldLabelStyled data-test-id={`${book.testId}-label`}>{ book.label }</FieldLabelStyled>
                                <FieldContentStyled data-test-id={book.testId}>{ book.value }</FieldContentStyled>
                            </FieldStyled>
                        }

                        <EditButtonStyled onClick={() => handleEditModeByLabel(book.label)}>Edit</EditButtonStyled>
                    </FieldContainerStyled>
                )}
            </DetailsContainerStyled>
        </ContainerStyled>
    )
}