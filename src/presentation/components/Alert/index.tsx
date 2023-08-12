import { AlertContainerStyled, AlertStyled } from "./styles";

type AlertProps = {
    children: string
    isActive: boolean
    testId?: string
}

function Alert({ children, isActive, testId }: AlertProps) {
    return (
        <AlertContainerStyled isActive={isActive}>
            <AlertStyled data-test-id={testId}>
                {children}
            </AlertStyled>
        </AlertContainerStyled>
    )
}

export { Alert }