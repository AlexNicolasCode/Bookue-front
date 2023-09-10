import styled from "styled-components";

import { globalColors } from "@/presentation/styles/colors";
import { Modes } from "@/presentation/contexts";

type NodeListProps = {
    mode?: Modes
}

export const NoteListStyled = styled.ul<NodeListProps>`
    height: ${({ mode }) => mode === Modes.AddMode ? '40%' : '90%'};
    overflow-y: scroll;
    padding: 0 2rem;
    margin: 0;
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

type NoteCustomModeStyledProps = {
    mode: Modes
}

const getBackgroundColorByMode = (mode: Modes) => {
    const backgroundColorMapper = {
        [Modes.DeleteMode]: '#F9ECE6'
    }
    const backgroundColorSelected = backgroundColorMapper[mode]
    if (backgroundColorSelected) {
        return backgroundColorSelected
    }
    return globalColors.field
}

export const NoteCustomModeStyled = styled.p<NoteCustomModeStyledProps>`
    background-color: ${({ mode }) => getBackgroundColorByMode(mode)};
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