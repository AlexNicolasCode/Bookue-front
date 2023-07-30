import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { UnloggedHeader, Register } from "@/presentation/components"
import { makeRegisterValidation } from "@/main/factory/validation"

function SignUpPage({
    validation = makeRegisterValidation()
}) {
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

            <Register
                validation={validation}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default SignUpPage