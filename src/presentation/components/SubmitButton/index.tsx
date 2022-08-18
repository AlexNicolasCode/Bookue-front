import { MouseEventHandler } from "react";

import { ButtonBorderStyled, ButtonStyled } from "./styles";

type ButtonProps = {
    value?: string
    borded?: boolean
}

export function SubmitButton({ value, borded }: ButtonProps) {
    const renderDefaultButton = () => {
        return (
            <ButtonStyled type="submit">
                {value}
            </ButtonStyled>
        )
    }

    const renderBorderButton = () => {
        return (
            <ButtonBorderStyled type="submit">
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