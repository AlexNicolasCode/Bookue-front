import styled, { css } from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

const noteListStyles = css`
    overflow-y: scroll;
    padding: 0 2rem;
    margin: 0;
`

export const NoteListDefault = styled.ul`
    height: 90%;
    ${noteListStyles}
`

export const NoteListAddMode = styled.ul`
    height: 40%;
    ${noteListStyles}
`

export const NoteStyled = styled.li`
    background-color: ${globalColors.field};
    color: ${globalColors.dark};
    padding: 1rem;
    width: calc(100vw - 6rem);
    min-height: 1rem;
    margin: 0 0 1rem 0;
`

export const TextStyled = styled.pre`
    font-family: 'Poppins';
    margin: 0;
    white-space: pre-wrap;
`

export const NoteDelete = styled.p`
    background-color: #F9ECE6;
    color: ${globalColors.dark};
    padding: 1rem;
    flex: 5;
    width: calc(100vw - 6rem);
    min-height: 1rem;
    margin: 0;
`

export const ModeActivetedContainerStyled = styled.li`
    display: flex;
    justify-content: space-between;
    min-height: 1rem;
    margin: 0 0 1rem 0;
`

export const OptionsNoteStyled = styled.section`
    display: flex;
    align-items: center;
    flex: 1;
`

export const OptionsStyled = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const AddNoteOptionStyled = styled.button`
    color: ${globalColors.white};
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: ${globalColors.primary};
`