import { globalColors } from "@/presentation/styles/colors";
import styled from "styled-components";

const InputStyled = styled.input`
    background-color: ${globalColors.white};
    border: none;
    width: 70%;
    height: 40px;
    padding: 0 1rem;
    
    ::placeholder {
        color: ${globalColors.gray};
    }
`

export {
    InputStyled
}