import { memo } from "react";
import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (field: string, text: string) => void
    field: string
    value: string
}

function InputComponent({ 
    type,
    placeholder,
    isWrongFill,
    setState,
    field,
    value,
}: InputProps) {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            isWrongFill={isWrongFill}
            onChange={(event) => setState(field, event.target.value)}
            value={value}
        />
    )
}

const Input = memo(InputComponent)
export { Input }