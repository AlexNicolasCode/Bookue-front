import styled, { css } from "styled-components";

import { Modes } from "@/presentation/contexts";

import { globalColors } from "@/presentation/styles/colors";

type OptionsProps = {
    mode?: Modes
}

const getConfigByMode = (mode: Modes): string => {
    const configMapper = {
        [Modes.AddMode]: `
            flex-direction: column;
            height: calc(60% - 2rem);
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
        `,
        [Modes.DefaultMode]: `
            height: 10%;
            justify-content: flex-end;
            align-items: center;
            padding: 0 1rem;
        `,
    }
    return configMapper[mode ?? Modes.DefaultMode]
}

export const OptionsStyled = styled.section<OptionsProps>`
    background-color: ${globalColors.white};
    padding: 0 1rem;
    display: flex;
    ${({ mode }) => getConfigByMode(mode)};
`

export const AddNoteInput = styled.textarea`
    width: calc(100% - 2rem);
    height: 75%;
    padding: 1rem;
    resize: none;
    background-color: ${globalColors.field};
    border: 1px ${globalColors.primary} solid;
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