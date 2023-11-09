import { TextStyled } from './styles'

type TextProps = {
  text?: string
}

export function Text({ text }: TextProps) {
  return <TextStyled>{text}</TextStyled>
}
