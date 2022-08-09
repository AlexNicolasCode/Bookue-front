import { BookModel } from "@/domain/models"

import {
    CardStyled,
    CountPageStyled,
    DescriptionStyled,
    DetailsButtonStyled,
    HeaderStyled,
    NotesButtonStyled,
    OptionsStyled,
    TitleStyled,
} from "./styles"

type CardProps = {
    book: BookModel
}

export function Card({ book }: CardProps) {
    return (
        <CardStyled>
            <HeaderStyled>
                <TitleStyled>{book.title}</TitleStyled>
                <CountPageStyled>{book.currentPage} - {book.pages}</CountPageStyled>
            </HeaderStyled>

            <DescriptionStyled>
                {book.description}
            </DescriptionStyled>

            <OptionsStyled>
                <NotesButtonStyled>Notes</NotesButtonStyled>
                <DetailsButtonStyled>Details</DetailsButtonStyled>
            </OptionsStyled>
        </CardStyled>
    )
}