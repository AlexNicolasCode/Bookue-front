import styled, { css } from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

export const OptionsStyled = styled.section`
  background-color: ${globalColors.white};
  padding: 0 1rem;
  display: flex;
  height: 10%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
`

const defaultButtonStyles = css`
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 1rem;
`

type ButtonProps = {
  isActive?: boolean
}

export const DeleteOptionStyled = styled.button<ButtonProps>`
  color: ${({ isActive }) => (isActive ? globalColors.alert : globalColors.gray)};
  ${defaultButtonStyles}
`
export const AddNoteOptionStyled = styled.button<ButtonProps>`
  border-radius: 100%;
  ${({ isActive }) =>
    isActive
      ? `
            border: 2px ${globalColors.primary} solid;
            color: ${globalColors.primary};
        `
      : `
            color: ${globalColors.white};
            background-color: ${globalColors.primary};
        `};
  ${defaultButtonStyles}
`

export const RemoveNoteOptionStyled = styled.button<ButtonProps>`
  color: ${globalColors.white};
  border-radius: 100%;
  background-color: ${globalColors.alert};
  ${defaultButtonStyles}
`
