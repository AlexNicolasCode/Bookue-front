import { memo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { IconStyled, InputStyled, PasswordContainerStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (fieldName: string, text: string) => void
    min?: number
    fieldName: string
    testId?: string
    value: string
}

function InputComponent({ 
    type,
    placeholder,
    isWrongFill,
    setState,
    min,
    fieldName,
    testId,
    value,
}: InputProps) {
    const [isShowingPassword, setIsShowingPassword] = useState<boolean>()
    const fieldType = useRef(type)
    
    const isPasswordField = /password/.test(fieldName)

    const handlePasswordView = () => {
        isShowingPassword ? fieldType.current = 'password' : fieldType.current = 'text'
        setIsShowingPassword(!isShowingPassword)
    }

    const renderLateralIcon = () => {
        const icon = isShowingPassword ? faEyeSlash : faEye
        return (
            <IconStyled onClick={handlePasswordView}>
                <FontAwesomeIcon
                    icon={icon}
                    data-test-id={`${fieldName}-icon-view`}
                />
            </IconStyled>
        )
    }

    const renderPasswordInput = () => (
        <PasswordContainerStyled isWrongFill={isWrongFill}>
            <InputStyled
                type={fieldType.current}
                placeholder={placeholder}
                data-test-id={testId}
                min={min}
                onChange={(event) => setState(fieldName, event.target.value)}
                value={value}
                isPasswordField={isPasswordField}
            />
            {renderLateralIcon()}
        </PasswordContainerStyled>
    )

    const renderDefaultInput = () => (
        <InputStyled
            type={fieldType.current}
            placeholder={placeholder}
            isWrongFill={isWrongFill}
            data-test-id={testId}
            min={min}
            onChange={(event) => setState(fieldName, event.target.value)}
            value={value}
        />
    )

    return isPasswordField ? renderPasswordInput() : renderDefaultInput()
}

const Input = memo(InputComponent)
export { Input }