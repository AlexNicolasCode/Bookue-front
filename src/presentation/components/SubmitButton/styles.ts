import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"

const ButtonStyled = styled.button`
    background-color: ${globalColors.primary};
    border-radius: 2.5px;
    color: ${globalColors.white};
    width: 125px;
    height: 40px;
`

const ButtonBorderStyled = styled.button`
    border: 2px solid ${globalColors.primary};
    border-radius: 2.5px;
    color: ${globalColors.primary};
    width: 125px;
    height: 40px;
`

export {
    ButtonStyled,
    ButtonBorderStyled,
}