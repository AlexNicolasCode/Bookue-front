import { Dispatch, SetStateAction } from "react";

import { InputStyled } from "./styles";

type InputProps = {
    type: string
    placeholder: string
    setState: Dispatch<SetStateAction<string>>
    value: string
}

export function Input({ 
    type,
    placeholder,
    setState,
    value,
}: InputProps) {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            onChange={(event) => setState(event.target.value)}
            value={value}
        />
    )
}