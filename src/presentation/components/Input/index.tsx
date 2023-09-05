import { memo } from "react";
import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (field: string, text: string) => void
    min?: number
    field: string
    testId?: string
    value: string
}

function InputComponent({ 
    type,
    placeholder,
    isWrongFill,
    setState,
    min,
    field,
    testId,
    value,
}: InputProps) {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            isWrongFill={isWrongFill}
            data-test-id={testId}
            min={min}
            onChange={(event) => setState(field, event.target.value)}
            value={value}
        />
    )
}

const Input = memo(InputComponent)
export { Input }