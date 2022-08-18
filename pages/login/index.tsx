import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { UnloggedHeader, Login } from "@/presentation/components"
import { makeLoginValidation } from "@/main/factory/validation"
import { ValidationComposite } from "@/main/composites"
import { makeRemoteAuthentication } from "@/main/factory/usecases"
import { Authentication } from "@/domain/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"

export type LoginPageProps = {
    validation: ValidationComposite
    remoteAuthentication: Authentication
}

function LoginPage({
    validation = makeLoginValidation(),
    remoteAuthentication = makeRemoteAuthentication(),
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
                remoteAuthentication={remoteAuthentication}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookieManager = makeCookieManagerAdapter()
    const token = await cookieManager.load('bookue-user')
    if (token) {
        return {
            props: {},
            redirect: {
                destination: '/'
            }
        }
    }
}

export default LoginPage