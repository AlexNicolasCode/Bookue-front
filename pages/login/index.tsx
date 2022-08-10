import { useRouter } from "next/router"

import { UnloggedHeader, Login } from "@/presentation/components"

function LoginPage() {
    const router = useRouter()

    const goToSignUpPage = () => {
        router.push('/sign-up')
    }

    return (
        <>
            <UnloggedHeader 
                value="Sign up"
                onClick={goToSignUpPage}
            />

            <Login />
        </>
    )
}

export default LoginPage