import { keyframes } from "styled-components"

export const popup = keyframes`
    100% { opacity: 1; transform: translateY(0) }
    0% { opacity: 0; transform: translateY(10rem) }
`

export const popout = keyframes`
    0% { opacity: 1; transform: translateY(0) }
    100% { opacity: 0; transform: translateY(10rem) }
`