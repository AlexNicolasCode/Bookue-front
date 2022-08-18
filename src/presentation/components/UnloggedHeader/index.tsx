import { MouseEventHandler } from "react"

import { ButtonBorderStyled, HeaderStyled } from "./styles"

type UnloggedHeaderProps = {
    value: string
    onClick: MouseEventHandler<HTMLButtonElement> 
}

function UnloggedHeader({ value, onClick }: UnloggedHeaderProps) {
    return (
        <HeaderStyled>
            <ButtonBorderStyled onClick={onClick}>
                {value}
            </ButtonBorderStyled>
        </HeaderStyled>
    )    
}

export { UnloggedHeader }