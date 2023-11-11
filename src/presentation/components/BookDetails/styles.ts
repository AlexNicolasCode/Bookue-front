import styled from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

const ContainerStyled = styled.section`
  padding: 0.5rem 1rem;
`

const HeaderStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const TitleStyled = styled.h1`
  font-size: 30px;
  font-weight: bold;
`

const LateralContainerStyled = styled.aside`
  width: 30%;
  text-align: right;
`

const TextStyled = styled.p``

const ProgressBarStyled = styled.p`
  color: ${globalColors.primary};
  font-weight: bold;
`

const DetailsContainerStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


export {
  ContainerStyled,
  HeaderStyled,
  TitleStyled,
  LateralContainerStyled,
  TextStyled,
  ProgressBarStyled,
  DetailsContainerStyled,
}
