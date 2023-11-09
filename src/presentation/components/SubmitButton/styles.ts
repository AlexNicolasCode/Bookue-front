import styled from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

type ButtonProp = {
  align?: 'left' | 'right'
}

const ButtonStyled = styled.button`
  background-color: ${globalColors.primary};
  border-radius: 2.5px;
  color: ${globalColors.white};
  width: 125px;
  height: 40px;
`

const ButtonBorderStyled = styled.button`
  border: 2px solid ${globalColors.primary};
  border-radius: 2.5px;
  color: ${globalColors.primary};
  width: 125px;
  height: 40px;
`

const OptionsStyled = styled.section`
  width: calc(70% + 2rem);
  display: flex;
  justify-content: ${({ align }: ButtonProp) => (align === 'right' ? 'flex-end' : 'flex-start')};
`

export { ButtonStyled, ButtonBorderStyled, OptionsStyled }
