import styled, { keyframes } from "styled-components"

import { globalColors } from "@/presentation/styles/colors"
import { fontSize } from "@/presentation/styles/font.size"

type ContainerProps = {
    isActive: boolean
    type: string
}

const popup = keyframes`
    100% { opacity: 1; transform: translateY(0) }
    0% { opacity: 0; transform: translateY(10rem) }
`

const popout = keyframes`
    0% { opacity: 1; transform: translateY(0) }
    100% { opacity: 0; transform: translateY(10rem) }
`

const AlertStyled = styled.p`
    color: ${globalColors.white};
    font-size: ${fontSize.large};
    font-family: Poppins;
`

const backgroundColorMapper = {
    succeds: globalColors.succeds,
    error: globalColors.alert,
    warn: globalColors.warn,
}

const AlertContainerStyled = styled.footer<ContainerProps>`
    background-color: ${({ type }) => backgroundColorMapper[type]};
    padding: 0.25rem 1rem;
    border-radius: 7.5px;
    animation-name: ${(props) => props.isActive ? popup : popout };
    animation-duration: 1.5s;
    animation-iteration-count: 1;
`

export {
    AlertStyled,
    AlertContainerStyled,
}