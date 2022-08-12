import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { 
    Form,
    Logo,
    Input,
    Alert,
    SubmitButton,
} from "src/presentation/components";

import { LoginStyled } from "./styles";

import { makeRemoteAuthentication } from "@/main/factory/usecases";
import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { Authentication } from "@/domain/usecases";
import { ValidationComposite } from "@/main/composites";

export type LoginProps = {
    validation: ValidationComposite
}

export function Login({ validation }: LoginProps) {
    const router = useRouter()
    const [alert, setAlert] = useState<string>("")
    const [userForm, setUserForm] = useState<Authentication.Params>({
        email: "",
        password: "",
    })
    const setEmail = (text: string) => setUserForm({...userForm, email: text})
    const setPassword = (text: string) => setUserForm({...userForm, password: text})

    const validateForm = (): string => {
        const passwordValidationError = validation.validate('password', userForm)
        const emailValidationError = validation.validate('email', userForm)
        return emailValidationError || passwordValidationError
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const error = validateForm()
            if (error) {
                setAlert(error)
                return
            }
            const remoteAuthentication = makeRemoteAuthentication()
            const account = await remoteAuthentication.auth({
                email: userForm.email,
                password: userForm.password,
            })
            if (!account) {
                alertUserNotFound()
                return
            }
            await setJwtLocaly(account.accessToken)
            goToFeedPage()
        } catch (error) {
            setAlert(error.message)
        }
    }

    const alertUserNotFound = () => {
        setAlert("User not found!")
        setTimeout(() => {
            setAlert("")
        }, 5000)
    }

    const setJwtLocaly = async (accessToken: string): Promise<void> => {
        const cookieManager = makeCookieManagerAdapter()
        await cookieManager.set('bookue-user', accessToken)
    }

    const goToFeedPage = () => {
        router.push("/")
    }

    return (
        <LoginStyled>
            <Logo/>

            <Form onSubmit={handleSubmit}>
                <Input 
                    type="email"
                    placeholder="Email"
                    setState={setEmail}
                    value={userForm.email}
                />
                <Input 
                    type="password"
                    placeholder="Password"
                    setState={setPassword}
                    value={userForm.password}
                />

                {
                    alert.length > 0 && 
                    <Alert>
                        {alert}
                    </Alert>
                }

                <SubmitButton value={'Login'}/>
            </Form>
        </LoginStyled>
    )
}