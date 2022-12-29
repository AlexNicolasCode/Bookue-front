import { globalColors } from "@/presentation/styles/colors";
import styled from "styled-components";

const HeaderStyled = styled.section`
    padding: 0.5rem 0.5rem;
    position: absolute;
    right: 0;
    z-index: 1;
`

const ButtonBorderStyled = styled.button`
    border: 2px solid ${globalColors.primary};
    border-radius: 2.5px;
    color: ${globalColors.primary};
    width: 125px;
    height: 40px;
`

export {
    HeaderStyled,
    ButtonBorderStyled,
}