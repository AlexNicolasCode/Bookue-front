import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";

export const NoteListStyled = styled.ul`
    padding: 0 2rem;
    margin: 0 0 1.5rem 0;
`

export const NoteStyled = styled.li`
    background-color: ${globalColors.field};
    color: ${globalColors.dark};
    padding: 1rem;
    width: calc(100vw - (2rem * 2));
    min-height: 1rem;
    margin: 0 0 1rem 0;
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