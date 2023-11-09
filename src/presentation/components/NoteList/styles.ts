import styled, { css } from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

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

export const Note = styled.li`
  background-color: ${globalColors.field};
  color: ${globalColors.dark};
  padding: 1rem;
  width: calc(100vw - 6rem);
  min-height: 1rem;
  margin: 0 0 1rem 0;
`

export const NoteText = styled.pre`
  font-family: 'Poppins';
  margin: 0;
  white-space: pre-wrap;
`

export const NoteDelete = styled.p`
  background-color: #f9ece6;
  color: ${globalColors.dark};
  padding: 1rem;
  flex: 5;
  width: calc(100vw - 6rem);
  min-height: 1rem;
  margin: 0;
`

export const DeleteModeContainer = styled.li`
  display: flex;
  justify-content: space-between;
  min-height: 1rem;
  margin: 0 0 1rem 0;
`

export const DeleteModeOptionsContainer = styled.section`
  display: flex;
  align-items: center;
`
