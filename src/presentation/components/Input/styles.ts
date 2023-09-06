import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

type InputStyledProps = {
    isWrongFill?: boolean 
    isPasswordField?: boolean
}

export const InputStyled = styled.input`
    background-color: ${globalColors.field};
    border: none;
    height: 40px;
    width: ${({ isPasswordField }: InputStyledProps) => 
        isPasswordField ? '14rem' : '15rem'
    };;
    padding: ${({ isPasswordField }: InputStyledProps) => 
        isPasswordField ? '0 0 0 1rem' : '0 1rem'
    };
    border: ${(props: InputStyledProps) => props.isWrongFill && `1px ${globalColors.alert} solid` };
    
    ::placeholder {
        color: ${globalColors.placeholder};
    }
`

type PasswordContainerStyledProps = {
    isWrongFill: boolean
}

export const PasswordContainerStyled = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${({ isWrongFill }: PasswordContainerStyledProps) =>
        isWrongFill && `1px ${globalColors.alert} solid`
    };
`

export const IconStyled = styled.i`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${globalColors.primary};
    background-color: ${globalColors.field};
    width: 2rem;
    height: 40px;
`