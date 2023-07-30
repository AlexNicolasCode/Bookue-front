import Link from "next/link"

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
        <CardStyled data-test-id="home-book-card">
            <HeaderStyled>
                <TitleStyled data-test-id="home-book-title">{book.title}</TitleStyled>
                <CountPageStyled data-test-id="home-book-pages">{book.currentPage} - {book.pages}</CountPageStyled>
            </HeaderStyled>

            <DescriptionStyled data-test-id="home-book-description">
                {book.description}
            </DescriptionStyled>

            <OptionsStyled>
                <NotesButtonStyled>Notes</NotesButtonStyled>
                <Link href={`/book/${book.id}`}>
                    <DetailsButtonStyled data-test-id="home-book-details-button">
                        Details
                    </DetailsButtonStyled>
                </Link>
            </OptionsStyled>
        </CardStyled>
    )
}