import { useState } from "react";
import { useRouter } from "next/router";

import { Input } from "../Input";
import { Logo } from "../Logo";
import { Button } from "../Button";

import {
    AlertStyled,
    FieldsStyled,
    LoginStyled,
} from "./styles";

import { makeRemoteAuthentication } from "@/main/factory/usecases";
import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { Authentication } from "@/domain/usecases";

export function Login() {
    const router = useRouter()
    const [alert, setAlert] = useState<string>("")
    const [userForm, setUserForm] = useState<Authentication.Params>({
        email: "",
        password: "",
    })
    const setEmail = (text: string) => setUserForm({...userForm, email: text})
    const setPassword = (text: string) => setUserForm({...userForm, password: text})
    
    const loginUser = async () => {
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

            <FieldsStyled>
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
                    <AlertStyled>
                        {alert}
                    </AlertStyled>
                }

                <Button 
                    onClick={loginUser}
                    value={'Login'}
                />
            </FieldsStyled>
        </LoginStyled>
    )
}