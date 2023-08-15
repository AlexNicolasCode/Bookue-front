import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { makeLoginValidation } from "@/main/factory/validation";
import { makeRemoteAuthentication } from "@/main/factory/usecases";
import { useAlert } from "@/presentation/hook";
import { AlertType } from "@/presentation/contexts";
import { 
    Form,
    Logo,
    Input,
    SubmitButton,
} from "@/presentation/components";

import { LoginStyled } from "./styles";


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

export function Login() {
    const router = useRouter()
    const { setNewAlert } = useAlert()

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
        const validation = makeLoginValidation()
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
                setNewAlert({ text: error, type: AlertType.error })
                return
            }
            const remoteAuthentication = makeRemoteAuthentication()
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
            setNewAlert({ text: "Internal server Error", type: AlertType.error })
        }
    }

    const alertUserNotFound = () => {
        setNewAlert({ text: "User not found!", type: AlertType.error })
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

                <SubmitButton text={'Login'} testId="sign-in-submit-form"/>
            </Form>
        </LoginStyled>
    )
}