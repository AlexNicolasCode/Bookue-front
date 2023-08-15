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
    const fieldNames = Object.keys(userForm)
    
    const setField = (field, text: string) => setUserForm({ 
        ...userForm,
        [field]: {
            isWrongFill: userForm[field].isWrongFill,
            text: text
        },
    })

    const getFieldsTexts = () => {
        const fieldTexts = {}
        fieldNames.forEach((fieldName: string) => fieldTexts[fieldName] = userForm[fieldName].text)
        return fieldTexts
    }

    const validateForm = (): string => {
        const fieldTexts = getFieldsTexts()
        const validator = makeLoginValidation()
        const errorList = fieldNames.map((field: string) => {
            const error = validator.validate(
                field,
                fieldTexts,
            )
            return { field, error }
        })
        const firstError = errorList.find((error) => error.error !== undefined)
        if (firstError && firstError.error) {
            setWrongFields(firstError.field)
            return firstError.error
        } 
    }

    const setWrongFields = (field: string) => {
        const cleanUserForm = getCleanUserForm()
        setUserForm({
            ...cleanUserForm,
            [field]: {
                ...cleanUserForm[field],
                isWrongFill: true,
            },
        })
    }

    const getCleanUserForm = () => {
        let cleannedUserForm: UserFormProps = { ...userForm }
        fieldNames.forEach((fieldName) => {
            if (cleannedUserForm[fieldName].isWrongFill) {
                cleannedUserForm[fieldName].isWrongFill = false
            }
        })
        return cleannedUserForm
    }
    
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
            if (!account) {
                alertUserNotFound()
                return
            }
            await setJwtLocaly(account.accessToken)
            goToFeedPage()
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongFields('email')
                setNewAlert({ text: error.message, type: AlertType.warn })
                return
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