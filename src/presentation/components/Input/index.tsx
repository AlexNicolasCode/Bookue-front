import { Dispatch, memo, useCallback, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { IconStyled, InputStyled, PasswordContainerStyled, TextareaStyled } from './styles'

type SetStateWithFieldName = {
  fieldName?: string
  text: string
}

type InputProps = {
  setStateWithFieldName?: ({ fieldName, text }: SetStateWithFieldName) => void
  setState?: Dispatch<string>
  value: string
  type?: string
  placeholder?: string
  isWrongFill?: boolean
  min?: number
  fieldName?: string
  testId?: string
  max?: string
  style?: {
    isBorded?: boolean
    hasNoPadding?: boolean
    height?: string
    width?: string
  }
}

function InputComponent({
  type,
  placeholder,
  isWrongFill,
  setStateWithFieldName,
  setState,
  min,
  fieldName,
  testId,
  value,
  max,
  style,
}: InputProps) {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>()
  const fieldType = useRef(type)

  const handleSetState = ({ fieldName, text }: SetStateWithFieldName) => {
    if (setState) {
      setState(text)
      return
    }
    if (setStateWithFieldName) {
      setStateWithFieldName({ fieldName, text })
      return
    }
  }

  const isPasswordField = useMemo(() => /password/.test(fieldName), [fieldName])

  const handlePasswordView = useCallback(() => {
    isShowingPassword ? (fieldType.current = 'password') : (fieldType.current = 'text')
    setIsShowingPassword(!isShowingPassword)
  }, [isShowingPassword, fieldType.current])

  const renderLateralIcon = useCallback(() => {
    const icon = isShowingPassword ? faEyeSlash : faEye
    return (
      <IconStyled onClick={handlePasswordView}>
        <FontAwesomeIcon icon={icon} data-test-id={`${fieldName}-icon-view`} />
      </IconStyled>
    )
  }, [isShowingPassword, fieldName])

  const renderPasswordInput = useCallback(() => (
    <PasswordContainerStyled isWrongFill={isWrongFill}>
      <InputStyled
        type={fieldType.current}
        placeholder={placeholder}
        data-test-id={testId}
        min={min}
        onChange={(event) => handleSetState({ fieldName, text: event.target.value })}
        value={value}
        isPasswordField={isPasswordField}
        {...style}
      />
      {renderLateralIcon()}
    </PasswordContainerStyled>
  ), [isWrongFill, isPasswordField, value, handleSetState])

  const renderDefaultInput = useCallback(() => {
    if (style && (style.height || style.width)) {
      return (
        <TextareaStyled
          placeholder={placeholder}
          isWrongFill={isWrongFill}
          data-test-id={testId}
          onChange={(event) => handleSetState({ fieldName, text: event.target.value })}
          value={value}
          {...style}
        />
      )
    }
    return (
      <InputStyled
        type={fieldType.current}
        placeholder={placeholder}
        isWrongFill={isWrongFill}
        data-test-id={testId}
        min={min}
        onChange={(event) => handleSetState({ fieldName, text: event.target.value })}
        value={value}
        max={max}
        {...style}
      />
    )
  }, [isWrongFill, isPasswordField, value, handleSetState])

  return isPasswordField ? renderPasswordInput() : renderDefaultInput()
}

export const Input = memo(InputComponent)