import { AlertContainerStyled, AlertFooterStyled, AlertStyled } from "./styles";

type AlertProps = {
    children: string
    type: string
}

function Alert({ children, type }: AlertProps) {
    return (
        <AlertFooterStyled>
            <AlertContainerStyled type={type}>
                <AlertStyled data-test-id="alert-message">
                    {children}
                </AlertStyled>
            </AlertContainerStyled>
        </AlertFooterStyled>
    )
}

export { Alert }