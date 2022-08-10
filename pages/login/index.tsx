import { useRouter } from "next/router"

import { Button, Login } from "@/presentation/components"

import { HeaderStyled } from "./styles"

function LoginPage() {
    const router = useRouter()

    const goToSignUpPage = () => {
        router.push('/sign-up')
    }

    return (
        <>
            <HeaderStyled>
                <Button 
                    borded
                    onClick={goToSignUpPage}
                    value="Sign up"
                />
            </HeaderStyled>

            <Login />
        </>
    )
}

export default LoginPage