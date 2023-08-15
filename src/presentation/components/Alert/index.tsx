import { AlertContainerStyled, AlertFooterStyled, AlertStyled } from "./styles";

type AlertProps = {
    children: string
    type: string
    testId?: string
}

function Alert({ children, type, testId }: AlertProps) {
    return (
        <AlertFooterStyled>
            <AlertContainerStyled type={type}>
                <AlertStyled data-test-id={testId}>
                    {children}
                </AlertStyled>
            </AlertContainerStyled>
        </AlertFooterStyled>
    )
}

export { Alert }