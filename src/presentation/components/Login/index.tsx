import { useState } from "react";

import { Input } from "../Input";
import { Logo } from "../Logo";
import { Button } from "../Button";

import {
    FieldsStyled,
    LoginStyled,
} from "./styles";

export function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

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

                <Button value={'Login'}/>
            </FieldsStyled>
        </LoginStyled>
    )
}