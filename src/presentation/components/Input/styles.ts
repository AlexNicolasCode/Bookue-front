import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

type InputStyledProps = {
    isWrongFill: boolean 
}

const InputStyled = styled.input`
    background-color: ${(props: InputStyledProps) => props.isWrongFill ? globalColors.warn : globalColors.field};
    border: none;
    width: 70%;
    height: 40px;
    padding: 0 1rem;
    
    ::placeholder {
        color: ${globalColors.placeholder};
    }
`

export {
    InputStyled
}