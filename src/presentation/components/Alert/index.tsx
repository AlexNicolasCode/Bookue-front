import { AlertContainerStyled, AlertStyled } from "./styles";

type AlertProps = {
    children: string
    isActive: boolean
    type: string
    testId?: string
}

function Alert({ children, isActive, type, testId }: AlertProps) {
    return (
        <AlertContainerStyled isActive={isActive} type={type}>
            <AlertStyled data-test-id={testId}>
                {children}
            </AlertStyled>
        </AlertContainerStyled>
    )
}

export { Alert }