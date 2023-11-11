import { globalColors } from '@/presentation/styles/colors'
import styled from 'styled-components'

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

  button {
    width: 150px;
    height: 40px;
    font-size: 0.8rem;
  }
`

const buttonStyles = `
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  text-decoration: none;
  font-size: 1rem;
`

const NotesOptionStyled = styled.a`
  background-color: ${globalColors.primary};
  border-radius: 2.5px;
  color: ${globalColors.white};
  ${buttonStyles}
`

const DetailsOptionStyled = styled.a`
  color: ${globalColors.primary};
  ${buttonStyles}
`

export {
  CardStyled,
  NotesOptionStyled,
  DetailsOptionStyled,
  OptionsStyled,
  TitleStyled,
  CountPageStyled,
  HeaderStyled,
  DescriptionStyled,
}
