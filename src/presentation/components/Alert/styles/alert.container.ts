import styled from "styled-components"

import { globalColors } from "@/presentation/styles/colors"
import { popout, popup } from "./animation"

type ContainerProps = {
    isActive: boolean
    type: string
}

const backgroundColorMapper = {
    succeds: globalColors.succeds,
    error: globalColors.alert,
    warn: globalColors.warn,
}

export const AlertContainerStyled = styled.footer<ContainerProps>`
    background-color: ${({ type }) => backgroundColorMapper[type]};
    padding: 0.25rem 1rem;
    border-radius: 7.5px;
    animation-name: ${(props) => props.isActive ? popup : popout };
    animation-duration: 1.5s;
    animation-iteration-count: 1;
`
