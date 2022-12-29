import { AlertStyled } from "./styles";

type AlertProps = {
    children: string
}

function Alert({ children }: AlertProps) {
    return (
        <AlertStyled>
            {children}
        </AlertStyled>
    )
}

export { Alert }