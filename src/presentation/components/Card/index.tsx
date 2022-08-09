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

export function Card() {
    return (
        <CardStyled>
            <HeaderStyled>
                <TitleStyled>Sherlock Holmes</TitleStyled>
                <CountPageStyled>0 - 100</CountPageStyled>
            </HeaderStyled>

            <DescriptionStyled>
                Sherlock Holmes é um personagem de ficção da literatura 
                britânica criado pelo médico e escritor Sir Arthur Conan Doyle...
            </DescriptionStyled>

            <OptionsStyled>
                <NotesButtonStyled>Notes</NotesButtonStyled>
                <DetailsButtonStyled>Details</DetailsButtonStyled>
            </OptionsStyled>
        </CardStyled>
    )
}