import { useRouter } from "next/router"

import { UnloggedHeader, Register } from "@/presentation/components"

function SignUpPage() {
    const router = useRouter()

    const goToLoginPage = () => {
        router.push('/login')
    }

    return (
        <>
            <UnloggedHeader 
                value="Login"
                onClick={goToLoginPage}
            />

            <Register />
        </>
    )
}

export default SignUpPage