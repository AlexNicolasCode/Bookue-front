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

export function Login() {
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [alert, setAlert] = useState<string>("")
    
    const loginUser = async () => {
        const remoteAuthentication = makeRemoteAuthentication()
        const result = await remoteAuthentication.auth({ email, password })
        if (!result) {
            alertUserNotFound()
            return
        }
        await setJwtLocaly(result.accessToken)
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
                    value={email}
                />
                <Input 
                    type="password"
                    placeholder="Password"
                    setState={setPassword}
                    value={password}
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