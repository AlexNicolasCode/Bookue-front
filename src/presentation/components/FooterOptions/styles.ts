import styled, { css } from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

export const FooterOptionsStyled = styled.section`
    background-color: ${globalColors.white};
    position: fixed;
    bottom: 0;
    padding: 1rem 1rem;
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 2rem);
`

const defaultButtonStyles = css`
    width: 2rem;
    height: 2rem;
    margin: 0 0 0 1rem;
`;

export const DeleteModeOptionStyled = styled.button`
    color: ${globalColors.gray};
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
    background-color: ${globalColors.primary};
    ${defaultButtonStyles}
`