import styled from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

type InputStyledProps = {
  isWrongFill?: boolean
  isPasswordField?: boolean
  isBorded?: boolean
  hasNoPadding?: boolean
  height?: string
  width?: string
}

const getInputStyles = ({
  isBorded,
  height,
  width,
  hasNoPadding,
  isWrongFill,
  isPasswordField,
}: InputStyledProps): string => {
  let styles = ``
  if (!isWrongFill && isBorded) styles += `border: 1px ${globalColors.primary} solid;`
  if (isWrongFill) styles += `border: 1px ${globalColors.alert} solid;`
  if (height) styles += `height: ${height};`
  if (width) styles += `width: ${width};`
  if (!width && isPasswordField) styles += `width: 14rem;`
  if (hasNoPadding) styles += `padding: 0;`
  if (!hasNoPadding && isPasswordField) styles += `padding: 0 0 0 1rem;`
  if (!hasNoPadding && width) styles += `width: calc(${width} - 2rem);`
  return styles
}

export const InputStyled = styled.input<InputStyledProps>`
  background-color: ${globalColors.field};
  height: 40px;
  width: 15rem;
  padding: 0 1rem;
  border: none;
  ${(props) => getInputStyles(props)}

  ::placeholder {
    color: ${globalColors.placeholder};
  }
`

export const TextareaStyled = styled.textarea<InputStyledProps>`
  background-color: ${globalColors.field};
  height: 40px;
  width: 15rem;
  padding: 1rem;
  ${(props) => getInputStyles(props)}

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
    isWrongFill && `1px ${globalColors.alert} solid`};
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
