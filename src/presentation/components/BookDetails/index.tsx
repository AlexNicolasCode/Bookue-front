import { BookModel } from "@/domain/models";
import {
    ContainerStyled,
    DetailsContainerStyled,
    EditButtonStyled,
    FieldContainerStyled,
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
}

export function BookDetails({ book }: BookDetailsProps) {
    const getBookProgressPerCent = () => {
        const perCent = String((book.currentPage * 100) / book.pages);
        return perCent.substring(0, 3)
    }

    const bookFields: BookField[] = [
        {
            label: "Title",
            text: book.title,
        },
        {
            label: "Author",
            text: book.author,
        },
        {
            label: "Description",
            text: book.description,
        },
        {
            label: "Current Page",
            text: book.currentPage,
        },
        {
            label: "Pages",
            text: book.pages,
        },
    ]

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
                {bookFields.map((book) =>
                    <FieldContainerStyled>
                        <FieldStyled>
                            <FieldLabelStyled>{ book.label }</FieldLabelStyled>
                            <FieldContentStyled>{ book.text }</FieldContentStyled>
                        </FieldStyled>

                        <EditButtonStyled>Edit</EditButtonStyled>
                    </FieldContainerStyled>
                )}
            </DetailsContainerStyled>
        </ContainerStyled>
    )
}