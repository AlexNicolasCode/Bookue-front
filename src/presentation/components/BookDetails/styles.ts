import { globalColors } from "@/presentation/styles/colors";
import styled from "styled-components";

const ContainerStyled = styled.section`
    padding: 0.5rem 1rem;
`

const HeaderStyled = styled.section`
    display: flex;
    align-items: center;
`

const TitleStyled = styled.h1`
    font-size: 30px;
    font-weight: bold;
    `

const LateralContainerStyled = styled.aside`
    width: 30%;
    text-align: right;
`

const TextStyled = styled.p``

const ProgressBarStyled = styled.p`
    color: ${globalColors.primary};
    font-weight: bold;
`

export {
    ContainerStyled,
    HeaderStyled,
    TitleStyled,
    LateralContainerStyled,
    TextStyled,
    ProgressBarStyled,
}