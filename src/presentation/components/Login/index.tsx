import { FormEvent, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";

import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { makeLoginValidation } from "@/main/factory/validation";
import { makeRemoteAuthentication } from "@/main/factory/usecases";
import { useAlert } from "@/presentation/hook";
import { AlertMessage, AlertType } from "@/presentation/contexts";
import { Form, Logo } from "@/presentation/components";

import { LoginStyled } from "./styles";

type Form = {
    email: string
    password: string
}

export function Login() {
    const router = useRouter()
    const { setNewAlert } = useAlert()
    const [wrongField, setWrongField] = useState<string>()

    const formFields = ['email', 'password']

    const alertUserNotFound = () => {
        setNewAlert({ text: "User not found!", type: AlertType.Error })
    }

    const setJwtLocaly = async (accessToken: string): Promise<void> => {
        const cookieManager = makeCookieManagerAdapter()
        await cookieManager.set('bookue-user', accessToken)
    }

    const goToFeedPage = () => {
        router.push("/")
    }

    const validateForm = (form: Form): string => {
        const validator = makeLoginValidation()
        const errorList = formFields.map((fieldName) => {
            const error = validator.validate(
                fieldName,
                form,
            )
            return { fieldName, error }
        })
        const firstError = errorList.find((error) => error.error !== undefined)
        if (firstError && firstError.error) {
            setWrongField(firstError.fieldName)
            return firstError.error
        } 
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>, form: Form) => {
        event.preventDefault()
        try {
            const error = validateForm(form)
            if (error) {
                setNewAlert({ text: error, type: AlertType.Error })
                return
            }
            const remoteAuthentication = makeRemoteAuthentication()
            const account = await remoteAuthentication.auth(form)
            if (!account) {
                alertUserNotFound()
                return
            }
            await setJwtLocaly(account.accessToken)
            goToFeedPage()
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongField('email')
                setNewAlert({ text: error.message, type: AlertType.Warn })
                return
            }
            setNewAlert({ text: AlertMessage.GenericError, type: AlertType.Error })
        }
    }

    return (
        <LoginStyled>
            <Logo/>
            <Form
                handleSubmit={handleSubmit}
                fields={formFields}
                wrongField={wrongField}
            />
        </LoginStyled>
    )
}