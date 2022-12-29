import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

type InputStyledProps = {
    isWrongFill: boolean 
}

const InputStyled = styled.input`
    background-color: ${globalColors.field};
    border: none;
    width: 70%;
    height: 40px;
    padding: 0 1rem;
    border: ${(props: InputStyledProps) => props.isWrongFill && `1px ${globalColors.warn} solid` };
    
    ::placeholder {
        color: ${globalColors.placeholder};
    }
`

export {
    InputStyled
}