import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

import {
    Form,
    Input,
    Logo,
    Alert,
    SubmitButton,
} from "src/presentation/components"

import { RegisterStyled } from "./styled"

import { makeRemoteAddAccount } from "@/main/factory/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"
import { ValidationComposite } from "@/main/composites"

type RegisterProps = {
    validation: ValidationComposite
}

type RegisterFormProps = {
    name: {
        isWrongFill: boolean
        text: string
    }
    email: {
        isWrongFill: boolean
        text: string
    }
    password: {
        isWrongFill: boolean
        text: string
    }
    passwordConfirmation: {
        isWrongFill: boolean
        text: string
    }
}


function Register({ validation }: RegisterProps) {
    const router = useRouter()

    const [alert, setAlert] = useState<string>("")
    const [userForm, setUserForm] = useState<RegisterFormProps>({
        name: {
            isWrongFill: false,
            text: ""
        },
        email: {
            isWrongFill: false,
            text: ""
        },
        password: {
            isWrongFill: false,
            text: ""
        },
        passwordConfirmation: {
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
        const fields = ['name', 'email', 'password', 'passwordConfirmation']
        for (let i = 0; i >= fields.length; i++) {
            const field = fields[i]
            const error = validation.validate(
                field,
                { [field]: userForm[field].text }
            )
            setWrongFields(field, error)
            return error
        }
    }

    const setWrongFields = (field: string, error: string) => {
        setUserForm({
            ...userForm,
            [field]: {
                isWrongFill: error ? true : false,
                text: userForm[field].text,
            },
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const error = validateForm()
            if (error) {
                setAlert(error)
                return
            }
            const remoteAddAccount = makeRemoteAddAccount()
            const { accessToken } = await remoteAddAccount.add({
                name: userForm.name.text,
                email: userForm.email.text,
                password: userForm.password.text,
                passwordConfirmation: userForm.passwordConfirmation.text,
            })
            await setJwtLocaly(accessToken)
            goToFeedPage()
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongFields('email', error.message)
            }
            setAlert(error.message)
        }
    }

    const setJwtLocaly = async (accessToken: string): Promise<void> => {
        const cookieManager = makeCookieManagerAdapter()
        await cookieManager.set('bookue-user', accessToken)
    }

    const goToFeedPage = () => {
        router.push("/")
    }

    return (
        <RegisterStyled>
            <Logo/>

            <Form onSubmit={handleSubmit}>
                <Input 
                    type="name"
                    placeholder="Name"
                    setState={setField}
                    field={'name'}
                    isWrongFill={userForm.name.isWrongFill}
                    value={userForm.name.text}
                />
                <Input 
                    type="email"
                    placeholder="Email"
                    setState={setField}
                    field={'email'}
                    isWrongFill={userForm.email.isWrongFill}
                    value={userForm.email.text}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    setState={setField}
                    field={'password'}
                    isWrongFill={userForm.password.isWrongFill}
                    value={userForm.password.text}
                />
                <Input 
                    type="password"
                    placeholder="Password confirmation"
                    setState={setField}
                    field={'passwordConfirmation'}
                    isWrongFill={userForm.passwordConfirmation.isWrongFill}
                    value={userForm.passwordConfirmation.text}
                />

                {
                    alert.length > 0 &&
                    <Alert>
                        {alert}                
                    </Alert>
                }

                <SubmitButton text={'Register'}/>
            </Form>
        </RegisterStyled>
    )
}

export { Register }