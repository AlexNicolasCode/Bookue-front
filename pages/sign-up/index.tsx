import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { UnloggedHeader, Register } from "@/presentation/components"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"

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

export default SignUpPage