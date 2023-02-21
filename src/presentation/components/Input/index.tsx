import { memo } from "react";
import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (field: string, text: string) => void
    field: string
    value: string
    max?: string
}

function InputComponent({ 
    type,
    placeholder,
    isWrongFill,
    setState,
    field,
    value,
    max,
}: InputProps) {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            isWrongFill={isWrongFill}
            onChange={(event) => setState(field, event.target.value)}
            value={value}
            max={max}
        />
    )
}

const Input = memo(InputComponent)
export { Input }