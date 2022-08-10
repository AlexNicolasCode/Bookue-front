import { globalColors } from "@/presentation/styles/colors"
import styled from "styled-components"

const LoginStyled = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    section {
        :first-child {
            margin-bottom: 20px;
        }
    }
` 

const FieldsStyled = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    grid-gap: 12px;
`

const AlertStyled = styled.p`
    color: ${globalColors.warn};
`

export {
    AlertStyled,
    FieldsStyled,
    LoginStyled,
}