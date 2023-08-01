import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

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
                testId={"login-button"}
            />
            <Register/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default SignUpPage