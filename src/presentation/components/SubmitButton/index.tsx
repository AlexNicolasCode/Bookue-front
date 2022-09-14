import { MouseEventHandler } from "react";

import { ButtonBorderStyled, ButtonStyled } from "./styles";

type ButtonProps = {
    text?: string
    borded?: boolean
}

export function SubmitButton({ text, borded }: ButtonProps) {
    const renderDefaultButton = () => {
        return (
            <ButtonStyled type="submit">
                {text}
            </ButtonStyled>
        )
    }

    const renderBorderButton = () => {
        return (
            <ButtonBorderStyled type="submit">
                {text}
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