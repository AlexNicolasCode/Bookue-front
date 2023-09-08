import styled, { css } from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

export const FooterOptionsStyled = styled.section`
    background-color: ${globalColors.white};
    padding: 0 1rem;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const defaultButtonStyles = css`
    width: 2rem;
    height: 2rem;
    margin: 0 0 0 1rem;
`;

type DeleteModeOptionProps = {
    isActive: boolean
}

export const DeleteModeOptionStyled = styled.button<DeleteModeOptionProps>`
    color: ${({ isActive }) =>
        isActive ? globalColors.alert : globalColors.gray
    };
    ${defaultButtonStyles}
`

export const AddNoteOptionStyled = styled.button`
    color: ${globalColors.white};
    border-radius: 100%;
    background-color: ${globalColors.primary};
    ${defaultButtonStyles}
`

export const RemoveNoteOptionStyled = styled.button`
    color: ${globalColors.white};
    border-radius: 100%;
    background-color: ${globalColors.alert};
    ${defaultButtonStyles}
`