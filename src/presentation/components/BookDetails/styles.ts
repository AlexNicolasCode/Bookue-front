import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

const ContainerStyled = styled.section`
    padding: 0.5rem 1rem;
`

const HeaderStyled = styled.section`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
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

const DetailsContainerStyled = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const FieldContainerStyled = styled.article`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
`

const FieldStyled = styled.article`
    color: ${globalColors.dark};
    font-size: 12px;
`

const FieldLabelStyled = styled.p`
    color: ${globalColors.gray};
    font-size: 12px;
    `

const FieldContentStyled = styled.p`
    font-weight: bold;
`

const EditButtonStyled = styled.p`
    color: ${globalColors.primary};
    font-size: 12px;
    font-weight: bold;
    line-height: 50px;
`

export {
    ContainerStyled,
    HeaderStyled,
    TitleStyled,
    LateralContainerStyled,
    TextStyled,
    ProgressBarStyled,
    DetailsContainerStyled,
    FieldContainerStyled,
    FieldStyled,
    FieldLabelStyled,
    FieldContentStyled,
    EditButtonStyled,
}