import { ButtonBorderStyled, ButtonStyled, OptionsStyled } from './styles'

type ButtonProps = {
  text?: string
  borded?: boolean
  align: 'left' | 'right'
  testId?: string
}

export function SubmitButton({ text, borded, align, testId }: ButtonProps) {
  const renderDefaultButton = () => {
    return (
      <ButtonStyled type='submit' data-test-id={testId}>
        {text}
      </ButtonStyled>
    )
  }

  const renderBorderButton = () => {
    return (
      <ButtonBorderStyled type='submit' data-test-id={testId}>
        {text}
      </ButtonBorderStyled>
    )
  }

  const renderButton = () => (borded ? renderBorderButton() : renderDefaultButton())

  const renderOptions = () => <OptionsStyled>{renderButton()}</OptionsStyled>

  return align ? renderOptions() : renderButton()
}
