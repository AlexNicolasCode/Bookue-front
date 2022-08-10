import { Button, Login } from "@/presentation/components"

import { HeaderStyled } from "./styled"

function LoginPage() {
    return (
        <>
            <HeaderStyled>
                <Button borded value="Sign Up"/>
            </HeaderStyled>

            <Login />
        </>
    )
}

export default LoginPage