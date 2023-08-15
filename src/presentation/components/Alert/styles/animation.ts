import { keyframes } from "styled-components"

export const popup = keyframes`
    0% { opacity: 0; transform: translateY(10rem); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 1; transform: translateY(10rem); }
`