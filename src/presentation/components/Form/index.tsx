import { FormStyled } from "./styles";

type FormProps = {
    children: JSX.Element | JSX.Element[]
}

function Form({ children }: FormProps) {
    return (
        <FormStyled>
            {children}
        </FormStyled>
    )
}

export { Form }