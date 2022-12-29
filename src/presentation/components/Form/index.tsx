import { FormEvent } from "react";

import { FormStyled } from "./styles";

type FormProps = {
    children: JSX.Element | JSX.Element[]
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function Form({ children, onSubmit }: FormProps) {
    return (
        <FormStyled onSubmit={onSubmit}>
            {children}
        </FormStyled>
    )
}

export { Form }