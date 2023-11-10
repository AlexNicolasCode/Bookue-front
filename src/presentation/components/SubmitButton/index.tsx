import { useCallback, useMemo } from 'react'

import { ButtonBorderStyled, ButtonStyled, OptionsStyled } from './styles'

type ButtonProps = {
  text?: string
  borded?: boolean
  align: 'left' | 'right'
  testId?: string
}

export function SubmitButton({ text, borded, align, testId }: ButtonProps) {
  const renderDefaultButton = useCallback(() => {
    return (
      <ButtonStyled type='submit' data-test-id={testId}>
        {text}
      </ButtonStyled>
    )
  }, [text, testId])

  const renderBorderButton = useCallback(() => {
    return (
      <ButtonBorderStyled type='submit' data-test-id={testId}>
        {text}
      </ButtonBorderStyled>
    )
  }, [text, testId])

  const renderButton = useCallback(() => (borded ? renderBorderButton() : renderDefaultButton()), [borded])

  const renderOptions = () => <OptionsStyled>{renderButton()}</OptionsStyled>

  return useMemo(() => align ? renderOptions() : renderButton(), [align])
}
