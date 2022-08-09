import { globalColors } from "@/presentation/styles/colors"
import styled from "styled-components"

const CardStyled = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;

    article {
        padding: 0.5rem 0;
    }
`

const HeaderStyled = styled.article`
    display: flex;
    justify-content: space-between;
`

const TitleStyled = styled.h1`
    font-size: 1rem;
`

const CountPageStyled = styled.p`
`

const DescriptionStyled = styled.p`
    text-align: justify;
    font-size: 0.7rem;
`

const OptionsStyled = styled.article`
    display: flex;
    width: 150px;
    height: 40px;

    button {
        width: 150px;
        height: 40px;
        font-size: 0.8rem;
    }
`

const NotesButtonStyled = styled.button`
    background-color: ${globalColors.primary};
    border-radius: 2.5px;
    color: ${globalColors.white};
`
    
const DetailsButtonStyled = styled.button`
    color: ${globalColors.primary}
`

export { 
    CardStyled,
    NotesButtonStyled,
    DetailsButtonStyled,
    OptionsStyled,
    TitleStyled,
    CountPageStyled,
    HeaderStyled,
    DescriptionStyled,
}