import styled from 'styled-components'

import { globalColors } from '@/presentation/styles/colors'

const CardStyled = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;

  article {
    padding: 0.5rem 0;
  }
`

const HeaderStyled = styled.article`
  display: flex;
  justify-content: space-between;
`

const TitleStyled = styled.h2`
  font-size: 1rem;
`

const CountPageStyled = styled.p``

const DescriptionStyled = styled.p`
  color: ${globalColors.gray};
  font-size: 0.7rem;
  text-align: justify;
`

const OptionsStyled = styled.article`
  display: flex;
  width: 150px;
  height: 40px;
`

type OptionProps = {
  isBorded?: boolean
}

const OptionStyled = styled.a<OptionProps>`
  background-color: ${({ isBorded }) => isBorded && globalColors.primary};
  border-radius: ${({ isBorded }) => isBorded && '2.5px'};
  color: ${({ isBorded }) => isBorded ? globalColors.white : globalColors.primary};
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  text-decoration: none;
  font-size: 1rem;
`

export {
  CardStyled,
  OptionStyled,
  OptionsStyled,
  TitleStyled,
  CountPageStyled,
  HeaderStyled,
  DescriptionStyled,
}
