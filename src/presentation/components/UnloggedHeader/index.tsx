import { MouseEventHandler } from "react"

import { SubmitButton } from "../SubmitButton"

import { HeaderStyled } from "./styles"

type UnloggedHeaderProps = {
    value: string
    onClick: MouseEventHandler<HTMLButtonElement> 
}

function UnloggedHeader({ value, onClick }: UnloggedHeaderProps) {
    return (
        <HeaderStyled>
            <SubmitButton
                borded
                onClick={onClick}
                value={value}
            />
        </HeaderStyled>
    )    
}

export { UnloggedHeader }