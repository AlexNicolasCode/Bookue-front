import { AlertStyled } from "./styles";

type AlertProps = {
    children: string
    testId?: string
}

function Alert({ children, testId }: AlertProps) {
    return (
        <AlertStyled data-test-id={testId}>
            {children}
        </AlertStyled>
    )
}

export { Alert }