import { MouseEventHandler } from "react"

import { ButtonBorderStyled, HeaderStyled } from "./styles"

type UnloggedHeaderProps = {
    value: string
    onClick: MouseEventHandler<HTMLButtonElement> 
    testId: string
}

function UnloggedHeader({ value, onClick, testId}: UnloggedHeaderProps) {
    return (
        <HeaderStyled>
            <ButtonBorderStyled onClick={onClick} data-test-id={testId}>
                {value}
            </ButtonBorderStyled>
        </HeaderStyled>
    )    
}

export { UnloggedHeader }