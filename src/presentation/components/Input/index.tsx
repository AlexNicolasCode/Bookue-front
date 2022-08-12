import { memo } from "react";
import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (text: string) => void
    value: string
}

function InputComponent({ 
    type,
    placeholder,
    isWrongFill,
    setState,
    value,
}: InputProps) {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            isWrongFill={isWrongFill}
            onChange={(event) => setState(event.target.value)}
            value={value}
        />
    )
}

const Input = memo(InputComponent)
export { Input }