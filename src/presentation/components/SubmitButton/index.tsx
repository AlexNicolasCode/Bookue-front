import { MouseEventHandler } from "react";

import { ButtonBorderStyled, ButtonStyled } from "./styles";

type ButtonProps = {
    value?: string
    borded?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}

export function SubmitButton({ value, borded, onClick }: ButtonProps) {
    const renderDefaultButton = () => {
        return (
            <ButtonStyled
                type="submit"
                onClick={onClick}
            >
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