import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"

const FieldStyled = styled.article`
  color: ${globalColors.dark};
  font-size: 12px;
`

const LabelStyled = styled.p`
  color: ${globalColors.gray};
  font-size: 12px;
`

const TextStyled = styled.p`
  font-weight: bold;
`

const TextEditModeStyled = styled.input`
  font-weight: bold;
`

const ContainerStyled = styled.article`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
`

const EditButtonStyled = styled.button`
  color: ${globalColors.primary};
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  width: 20px;
`

export {
  EditButtonStyled,
  ContainerStyled,
  TextStyled,
  TextEditModeStyled,
  LabelStyled,
  FieldStyled,
}