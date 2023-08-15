import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"
import { popup } from "./animation"

type ContainerProps = {
    type: string
}

const backgroundColorMapper = {
    succeds: globalColors.succeds,
    error: globalColors.alert,
    warn: globalColors.warn,
}

export const AlertContainerStyled = styled.footer<ContainerProps>`
    animation-name: ${popup};
    animation-duration: 15s;
    animation-iteration-count: 1;
    background-color: ${({ type }) => backgroundColorMapper[type]};
    border-radius: 5px;
    text-align: center;
    padding: 0.25rem 1rem;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 70%;
    z-index: 1000;
`
