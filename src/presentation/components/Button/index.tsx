import { MouseEventHandler } from "react";

import { ButtonStyled } from "./styles";

type ButtonProps = {
    value?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({ value, onClick }: ButtonProps) {
    return (
        <ButtonStyled onClick={onClick}>
            {value}
        </ButtonStyled>
    )
} 