import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"

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

const FieldContentEditingModeStyled = styled.input`
  font-weight: bold;
`

const FieldContainerStyled = styled.article`
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
    FieldContainerStyled,
    FieldContentStyled,
    FieldContentEditingModeStyled,
    FieldLabelStyled,
    FieldStyled,
}