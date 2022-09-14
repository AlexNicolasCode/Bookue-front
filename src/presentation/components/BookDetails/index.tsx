import { BookModel } from "@/domain/models";
import { MouseEventHandler, useState } from "react";
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
    text: string | number
    isEditing: boolean
}

export function BookDetails({ book }: BookDetailsProps) {
    const [editableBook, setEditableBook] = useState<BookModel>(book)
    const [bookFields, setBookFields] = useState<BookField[]>([
        {
            label: "Title",
            text: editableBook.title,
            isEditing: false,
        },
        {
            label: "Author",
            text: editableBook.author,
            isEditing: false,
        },
        {
            label: "Description",
            text: editableBook.description,
            isEditing: false,
        },
        {
            label: "Current Page",
            text: editableBook.currentPage,
            isEditing: false,
        },
        {
            label: "Pages",
            text: editableBook.pages,
            isEditing: false,
        },
    ])

    const getBookProgressPerCent = () => {
        const perCent = String((editableBook.currentPage * 100) / editableBook.pages);
        return perCent.substring(0, 3)
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
        setBookFieldByLabel(label, "text", value)
    }

    const handleEditModeByLabel = (label: string) => {
        const bookField = bookFields.find((field) => field.label === label)
        setBookFieldByLabel(label, "isEditing", !bookField.isEditing)
    }

    return (
        <ContainerStyled>
            <HeaderStyled>
                <TitleStyled>{book.title}</TitleStyled>

                <LateralContainerStyled>
                    <TextStyled>Progress</TextStyled>
                    <ProgressBarStyled>{ getBookProgressPerCent() }%</ProgressBarStyled>
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
                                    value={ book.text }
                                />
                            </FieldStyled>
                            :
                            <FieldStyled>
                                <FieldLabelStyled>{ book.label }</FieldLabelStyled>
                                <FieldContentStyled>{ book.text }</FieldContentStyled>
                            </FieldStyled>
                        }

                        <EditButtonStyled onClick={() => handleEditModeByLabel(book.label)}>Edit</EditButtonStyled>
                    </FieldContainerStyled>
                )}
            </DetailsContainerStyled>
        </ContainerStyled>
    )
}