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

import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { ValidationComposite } from "@/main/composites";
import { Authentication } from "@/domain/usecases";

export type LoginProps = {
    validation: ValidationComposite
    remoteAuthentication: Authentication
}

type UserFormProps = {
    email: {
        isWrongFill: boolean
        text: string
    }
    password: {
        isWrongFill: boolean
        text: string
    }
}

export function Login({ validation, remoteAuthentication }: LoginProps) {
    const router = useRouter()
    const [alert, setAlert] = useState<string>("")
    const [userForm, setUserForm] = useState<UserFormProps>({
        email: {
            isWrongFill: false,
            text: ""
        },
        password: {
            isWrongFill: false,
            text: ""
        },
    })
    
    const setField = (field, text: string) => setUserForm({ 
        ...userForm,
        [field]: {
            isWrongFill: userForm[field].isWrongFill,
            text: text
        },
    })


    const validateForm = (): string => {
        const emailValidationError = validation.validate('email', { email: userForm.email.text })
        const passwordValidationError = validation.validate('password', { password: userForm.password.text })
        setWrongFields(emailValidationError, passwordValidationError)
        return emailValidationError || passwordValidationError
    }

    const setWrongFields = (
        emailValidationError?: string, 
        passwordValidationError?: string
    ) => {
        if (emailValidationError || passwordValidationError) {
            setUserForm({
                email: {
                    isWrongFill: emailValidationError ? true : false,
                    text: userForm.email.text,
                },
                password: {
                    isWrongFill: passwordValidationError ? true : false,
                    text: userForm.password.text,
                },
            })
        }
    }

    const cleanWrongField = (): void => setWrongFields()
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const error = validateForm()
            if (error) {
                setAlert(error)
                return
            }
            const account = await remoteAuthentication.auth({
                email: userForm.email.text,
                password: userForm.password.text,
            })
            cleanWrongField()
            if (!account) {
                alertUserNotFound()
                return
            }
            await setJwtLocaly(account.accessToken)
            goToFeedPage()
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongFields(error.message)
            }
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
                    placeholder="email"
                    setState={setField}
                    field={"email"}
                    isWrongFill={userForm.email.isWrongFill}
                    value={userForm.email.text}
                    testId="sign-in-email"
                />
                <Input 
                    type="password"
                    placeholder="password"
                    setState={setField}
                    field={"password"}
                    isWrongFill={userForm.password.isWrongFill}
                    value={userForm.password.text}
                    testId="sign-in-password"
                />

                {
                    alert.length > 0 && 
                    <Alert testId="sign-up-alert">
                        {alert}
                    </Alert>
                }

                <SubmitButton text={'Login'} testId="sign-in-submit-form"/>
            </Form>
        </LoginStyled>
    )
}