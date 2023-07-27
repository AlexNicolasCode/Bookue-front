import { MouseEventHandler } from "react";

import { ButtonBorderStyled, ButtonStyled } from "./styles";

type ButtonProps = {
    text?: string
    borded?: boolean
    testId?: string
}

export function SubmitButton({ text, borded, testId }: ButtonProps) {
    const renderDefaultButton = () => {
        return (
            <ButtonStyled type="submit" data-test-id={testId}>
                {text}
            </ButtonStyled>
        )
    }

    const renderBorderButton = () => {
        return (
            <ButtonBorderStyled type="submit" data-test-id={testId}>
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