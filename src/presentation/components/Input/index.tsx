import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    isWrongFill: boolean 
    setState: (text: string) => void
    value: string
}

export function Input({ 
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