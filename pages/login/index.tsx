import { useRouter } from "next/router"

import { UnloggedHeader, Login } from "@/presentation/components"
import { makeLoginValidation } from "@/main/factory/validation"
import { ValidationComposite } from "@/main/composites"

export type LoginPageProps = {
    validation: ValidationComposite
}

function LoginPage({
    validation = makeLoginValidation()
}: LoginPageProps) {
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

            <Login
                validation={validation}
            />
        </>
    )
}

export default LoginPage