import { ButtonStyled } from "./styles";

type ButtonProps = {
    value?: string
}

export function Button({ value }: ButtonProps) {
    return (
        <ButtonStyled>
            {value}
        </ButtonStyled>
    )
} 