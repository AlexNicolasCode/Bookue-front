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

import { AddAccount } from "@/domain/usecases"
import { makeRemoteAddAccount } from "@/main/factory/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"

function Register() {
    const router = useRouter()

    const [alert, setAlert] = useState<string>("")
    const [userForm, setUserForm] = useState<AddAccount.Params>({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })
    const setName = (text: string) => setUserForm({...userForm, name: text})
    const setEmail = (text: string) => setUserForm({...userForm, email: text})
    const setPassword = (text: string) => setUserForm({...userForm, password: text})
    const setPasswordConfirmation = (text: string) => setUserForm({...userForm, passwordConfirmation: text})

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const remoteAddAccount = makeRemoteAddAccount()
            const account = await remoteAddAccount.add({
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                passwordConfirmation: userForm.passwordConfirmation,
            })
        } catch (error) {
            setAlert(error.message)
        }
    }

    return (
        <RegisterStyled>
            <Logo/>

            <Form onSubmit={handleSubmit}>
                <Input 
                    type="name"
                    placeholder="Name"
                    setState={setName}
                    value={userForm.name}
                />
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
                <Input 
                    type="password"
                    placeholder="Password confirmation"
                    setState={setPasswordConfirmation}
                    value={userForm.passwordConfirmation}
                />

                {
                    alert.length > 0 &&
                    <Alert>
                        {alert}                
                    </Alert>
                }

                <SubmitButton
                    onClick={handleSubmit}
                    value={'Register'}
                />
            </Form>
        </RegisterStyled>
    )
}

export { Register }