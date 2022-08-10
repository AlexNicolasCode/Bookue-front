import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"

const ButtonStyled = styled.button`
    background-color: ${globalColors.primary};
    border-radius: 2.5px;
    color: ${globalColors.white};
    width: 125px;
    height: 40px;
`
export {
    ButtonStyled,
}