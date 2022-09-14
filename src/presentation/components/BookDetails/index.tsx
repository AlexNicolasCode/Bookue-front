import { BookModel } from "@/domain/models";
import {
    ContainerStyled,
    HeaderStyled,
    LateralContainerStyled,
    ProgressBarStyled,
    TextStyled,
    TitleStyled,
} from "./styles";

type BookDetailsProps = {
    book: BookModel
}

export function BookDetails({ book }: BookDetailsProps) {
    const getBookProgressPerCent = () => {
        const perCent = String((book.currentPage * 100) / book.pages);
        return perCent.substring(0, 3)
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
        </ContainerStyled>
    )
}