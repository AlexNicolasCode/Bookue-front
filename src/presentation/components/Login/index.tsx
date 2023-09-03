import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { makeCookieManagerAdapter } from "@/main/factory/cookie";
import { makeLoginValidation } from "@/main/factory/validation";
import { makeRemoteAuthentication } from "@/main/factory/usecases";
import { useAlert } from "@/presentation/hook";
import { AlertMessage, AlertType } from "@/presentation/contexts";
import { 
    Form,
    Logo,
    Input,
    SubmitButton,
} from "@/presentation/components";

import { LoginStyled } from "./styles";

type FieldNames = 'email' | 'password'

type UserFormProps = {
    [field in FieldNames]: {
        fieldName: FieldNames
        isWrongFill: boolean
        text: string
        placeholder: string
        type: FieldNames
        testId: string
    }
}

export function Login() {
    const router = useRouter()
    const { setNewAlert } = useAlert()

    const [userForm, setUserForm] = useState<UserFormProps>({
        email: {
            fieldName: "email",
            type: "email",
            placeholder: "email",
            isWrongFill: false,
            text: "",
            testId: "sign-in-email",
        },
        password: {
            fieldName: "password",
            type: "password",
            placeholder: "password",
            isWrongFill: false,
            text: "",
            testId: "sign-in-password"
        },
    })
    const fieldNames = Object.keys(userForm) as FieldNames[]
    
    const setField = (field, text: string) => setUserForm({ 
        ...userForm,
        [field]: {
            ...userForm[field],
            text: text,
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
                setNewAlert({ text: error, type: AlertType.Error })
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
                setNewAlert({ text: error.message, type: AlertType.Warn })
                return
            }
            setNewAlert({ text: AlertMessage.GenericError, type: AlertType.Error })
        }
    }

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

    const renderFormFields = () => {
        const fields = fieldNames.map((field: FieldNames, index: number) => (
            <Input 
                type={userForm[field].type}
                placeholder={userForm[field].placeholder}
                setState={setField}
                field={userForm[field].fieldName}
                isWrongFill={userForm[field].isWrongFill}
                testId={userForm[field].testId}
                value={userForm[field].text}
                key={index}
            />
        ))
        return <>{fields}</>
    }

    return (
        <LoginStyled>
            <Logo/>

            <Form onSubmit={handleSubmit}>
                {renderFormFields()}
                <SubmitButton text={'Login'} testId="sign-in-submit-form"/>
            </Form>
        </LoginStyled>
    )
}