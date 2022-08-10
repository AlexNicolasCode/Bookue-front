import { MouseEventHandler } from "react"

import { Button } from "../Button"

import { HeaderStyled } from "./styles"

type UnloggedHeaderProps = {
    value: string
    onClick: MouseEventHandler<HTMLButtonElement> 
}

function UnloggedHeader({ value, onClick }: UnloggedHeaderProps) {
    return (
        <HeaderStyled>
            <Button 
                borded
                onClick={onClick}
                value={value}
            />
        </HeaderStyled>
    )    
}

export { UnloggedHeader }