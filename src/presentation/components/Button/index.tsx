import { ButtonStyled } from "./styles";

type ButtonProps = {
    children?: JSX.Element
}

export function Button({ children }: ButtonProps) {
    return (
        <ButtonStyled>
            {children}
        </ButtonStyled>
    )
} 