import { MouseEventHandler } from "react";

import { ButtonBorderStyled, ButtonStyled } from "./styles";

type ButtonProps = {
    value?: string
    borded?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({ value, onClick, borded }: ButtonProps) {
    const renderDefaultButton = () => {
        return (
            <ButtonStyled onClick={onClick}>
                {value}
            </ButtonStyled>
        )
    }

    const renderBorderButton = () => {
        return (
            <ButtonBorderStyled onClick={onClick}>
                {value}
            </ButtonBorderStyled>
        )
    }

    return (
        <>
            {borded
                ? renderBorderButton()
                : renderDefaultButton()
            }
        </>
    )
} 