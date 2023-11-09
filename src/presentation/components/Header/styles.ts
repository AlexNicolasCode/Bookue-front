import styled from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 7.5%;
`

const BackButtonStyled = styled.section`
  color: ${globalColors.primary};
`

const AddBookButtonStyled = styled.section`
  color: ${globalColors.primary};
`

export { HeaderStyled, BackButtonStyled, AddBookButtonStyled }
