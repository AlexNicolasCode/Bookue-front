import { useState } from "react"

import {
    Form,
    Input,
    Logo,
    Button,
} from "src/presentation/components"
import { AddAccount } from "@/domain/usecases"

import { RegisterStyled } from "./styled"

function Register() {
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
    const registerUser = () => {}

    return (
        <RegisterStyled>
            <Logo/>

            <Form>
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

                <Button
                    onClick={registerUser}
                    value={'Register'}
                />
            </Form>
        </RegisterStyled>
    )
}

export { Register }