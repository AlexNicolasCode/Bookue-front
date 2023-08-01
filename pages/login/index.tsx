import { GetServerSideProps } from "next"
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
                testId="sign-up-button"
            />
            <Login />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default LoginPage