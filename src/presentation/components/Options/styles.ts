import styled, { css } from "styled-components";

import { Modes } from "@/presentation/contexts";

import { globalColors } from "@/presentation/styles/colors";

type OptionsProps = {
    mode?: Modes
}

export const OptionsStyled = styled.section<OptionsProps>`
    background-color: ${globalColors.white};
    padding: 0 1rem;
    height: ${({ mode }) => mode === Modes.AddMode ? '60%' : '10%'};
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const defaultButtonStyles = css`
    width: 2rem;
    height: 2rem;
    margin: 0 0 0 1rem;
`;

type ButtonProps = {
    mode: Modes
}

export const DeleteModeOptionStyled = styled.button<ButtonProps>`
    color: ${({ mode }) => mode === Modes.DeleteMode
        ? globalColors.alert
        : globalColors.gray
    };
    ${defaultButtonStyles}
`

export const AddNoteOptionStyled = styled.button<ButtonProps>`
    border-radius: 100%;
    ${({ mode }) => mode === Modes.AddMode
        ?
        `
            border: 2px ${globalColors.primary} solid;
            color: ${globalColors.primary};
        `
        :
        `
            color: ${globalColors.white};
            background-color: ${globalColors.primary};
        `
    };;
    ${defaultButtonStyles}
`

export const RemoveNoteOptionStyled = styled.button<ButtonProps>`
    color: ${globalColors.white};
    border-radius: 100%;
    background-color: ${globalColors.alert};
    ${defaultButtonStyles}
`