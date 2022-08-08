import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"

const HeaderStyled = styled.header`
    display: flex;
    justify-content: center;
    padding: 1rem;
`

const LogoStyled = styled.section`
    font-family: 'Poppins';
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.25rem;
    color: ${globalColors.primary};
`

export { 
    HeaderStyled, 
    LogoStyled,
}